import { EventEmitter } from "events";

class MutexGuard extends EventEmitter {
    private isLocked: boolean;
    private queue: string[];

    constructor() {
        super();

        this.isLocked = false;
        this.queue = [];

        this.addListener(
            this.getProcessQueueEventName(),
            this.processQueueHandler.bind(this),
        );
    }

    private getProcessQueueEventName() {
        return "processQueue";
    }

    private getWaitingJobEventName(index: number) {
        return `waitingJob:${index}`;
    }

    private async processQueueHandler() {
        const waitingJobEventName = this.queue.pop();

        if (!waitingJobEventName) {
            return;
        }

        this.emit(waitingJobEventName);
    }

    public async lock(): Promise<true> {
        return new Promise((resolve, _) => {
            if (this.isLocked) {
                const index = this.queue.length;
                const waitingJobEvent = this.getWaitingJobEventName(index);

                this.queue.push(waitingJobEvent);

                this.prependOnceListener(waitingJobEvent, () => {
                    this.isLocked = true;
                    return resolve(true);
                });
            } else {
                this.isLocked = true;
                return resolve(true);
            }
        });
    }

    public unlock() {
        this.isLocked = false;
        this.emit(this.getProcessQueueEventName());
    }
}

export default MutexGuard;

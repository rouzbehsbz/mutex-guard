/// <reference types="node" />
import { EventEmitter } from "events";
declare class MutexGuard extends EventEmitter {
    private isLocked;
    private queue;
    constructor();
    private getProcessQueueEventName;
    private getWaitingJobEventName;
    private processQueueHandler;
    lock(): Promise<true>;
    unlock(): void;
}
export default MutexGuard;

class Deffered<T> {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
  resolve!: (value: T | PromiseLike<T>) => void;
  reject!: (value: T | PromiseLike<T>) => void;
  promise: Promise<T>;
}

class MutexGuard {
  private queue: Deffered<void>[];

  constructor() {
    this.queue = [];
  }

  public lock() {
    const prev = this.queue.at(-1);
    const deffered = new Deffered<void>();
    this.queue.push(deffered);
    return prev?.promise || Promise.resolve();
  }

  public unlock() {
    const item = this.queue.shift();
    item?.resolve();
  }
}

export default MutexGuard;

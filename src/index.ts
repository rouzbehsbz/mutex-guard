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

  public async lock() {
    const deffered = new Deffered<void>();
    this.queue.push(deffered);
    return deffered.promise;
  }

  public unlock() {
    const item = this.queue.shift();
    item?.resolve();
  }
}

export default MutexGuard;

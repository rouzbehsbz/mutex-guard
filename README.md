# Mutex Guard

Mutex Guard is a simple yet robust mutex implementation in TypeScript for managing critical sections and synchronizing access to shared resources in Node.js applications.

## Features

- Lightweight Implementation: Mutex Guard doesn't rely on external packages like Redis for atomic locking, keeping it lightweight and dependency-free.
- Native Event Emitter: Implemented using the native Node.js event emitter module, providing an efficient event-based mechanism for queuing and processing lock requests, thus preventing resource contention.
- Efficient Waiting Mechanism: Ensures that every request waiting for lock access to a resource is handled efficiently, ensuring optimal resource utilization.

## Installation

You can install MutexGuard via npm:

```bash
npm install mutex-guard
```

## Usage

In this example, we spawn three asynchronous login jobs, but we aim to call the login function only once. By utilizing the locking mechanism, we guarantee that the login function is invoked only once.

```TypeScript
import MutexGuard from "mutex-guard";
import { setTimeout } from "timers/promises";

let isLoggedIn = false;

async function main() {
    let mutexGuard = new MutexGuard();
    let pendingPromises = [];

    for (let i = 0; i < 3; i++) {
        pendingPromises.push(login(mutexGuard));
    }

    await Promise.all(pendingPromises);
}

async function login(mutexGuard: MutexGuard) {
    await mutexGuard.lock();

    if (isLoggedIn) {
        console.log("Already logged in.");
    } else {
        console.log("Logging ...");
        await setTimeout(3000);
        isLoggedIn = true;
        console.log("Logged in.");
    }

    mutexGuard.unlock();
}

main();

```

Output:

```bash
Logging ...
Logged in.
Already logged in.
Already logged in.
```

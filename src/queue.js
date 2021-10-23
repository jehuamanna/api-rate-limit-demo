import PendingPromises from "./pending-promises";

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item, queue, limit) {
    this.items.push(item)
  }
  myPromise() {}
  dequeue() {
    return this.items.shift();
  }
  isQueueEmpty() {
    return this.items.length === 0;
  }
}

export default Queue;

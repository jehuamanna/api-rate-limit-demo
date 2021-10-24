import PendingPromises from "./pending-promises";

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item, url) {
    this.items.push({ item, url });
  }
  dequeue() {
    return this.items.shift();
  }
  isQueueEmpty() {
    return this.items.length === 0;
  }
}

export default Queue;

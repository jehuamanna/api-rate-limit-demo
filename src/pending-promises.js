class PendingPromises {
  constructor(queue, limit) {
    if (!PendingPromises._instance) {
      PendingPromises._instance = this;
    }
    this.queue = queue;
    this.limit = limit;
    this.pendingPromises = [];
    return PendingPromises._instance;
  }
  getInstance() {
    return this._instance;
  }
  add(item, url) {
    const index = this.pendingPromises.push({ item, url });
    this.resolve(index - 1);
  }
  length() {
    return this.pendingPromises.length;
  }
  remove(index) {
    this.pendingPromises.splice(index, 1);
    if (!this.queue.isQueueEmpty()) {
      const item = this.queue.dequeue();
      const { axiosPromise, setValue } = item;
      if (this.length() < this.limit) {
        const indexNew = this.add({axiosPromise, setValue });
      }
    }
  }
  resolve(index) {
    console.log("lol", this.pendingPromises[index])
    const { item } = this.pendingPromises[index];
    const { axiosPromise, setValue } = item;
    const that = this;
    axiosPromise().then((value) => {
      console.log("value", value);
      setValue(value);
      that.remove(index);
    });
  }
}

export default PendingPromises;

class PendingPromises {
  constructor(queue, limit) {
    this.queue = queue;
    this.limit = limit;
    this.pendingPromises = [];
  }
  add(item, url) {
    if (this.length() < this.limit) {
      const index = this.pendingPromises.push({ item, url });
      this.resolve(index - 1);
    } else {
      this.queue.enqueue(item);
    }
  }
  length() {
    return this.pendingPromises.length;
  }
  remove(index) {
    this.pendingPromises.splice(index, 1);
    if (!this.queue.isQueueEmpty()) {
      if (this.length() < this.limit) {
        const { item, url } = this.queue.dequeue();
        const { axiosPromise, setValue } = item;
        this.add({ axiosPromise, setValue }, url);
      }
    }
  }
  resolve(index) {
    // console.log(this.pendingPromises[index]);
    const { item } = this.pendingPromises[index];
    const { axiosPromise, setValue } = item;
    axiosPromise().then(
      function (value) {
        setValue(value);
        this.remove(index);
      }.bind(this)
    );
  }
}

export default PendingPromises;

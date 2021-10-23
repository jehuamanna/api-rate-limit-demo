import axios from "axios";
import Queue from "./queue";
import PendingPromises from "./pending-promises";

const urlMap = {};
function RL(urlMain, limit) {
  const queue = new Queue();
  const add = urlMain.split("//")[1].split("/")[0];
  if (!urlMap[add]) {
    urlMap[add] = {
      queue,
      pendingPromises: new PendingPromises(queue, limit)
    };
  }

  class Fetch {
    // console.log(url);
    constructor(url) {
      this.value = null;
      const add = url.split("//")[1].split("/")[0];
      const myUrlMap = urlMap[add];
      const axiosPromise = () => axios.get(url);

      if (myUrlMap.pendingPromises.length() < limit) {
        myUrlMap.pendingPromises.add(
          { axiosPromise, setValue: this.setValue.bind(this) },
          url
        );
      } else {
        myUrlMap.queue.enqueue(
          { axiosPromise, setValue: this.setValue.bind(this) },
          queue,
          limit
        );
      }
    }
    setValue(value) {
      this.value = value;
    }
    returnValue() {
      const that = this;
      return new Promise((resolve, reject) => {
        if (that.interval) {
          clearInterval(that.interval);
        }
        that.interval = setInterval(() => {
          if (that.value) {
            resolve(that.value);
            clearInterval(that.interval);
          } else {
            that.returnValue();
          }
        }, 1000);
      });
    }
  }
  return {
    fetch: (url) => {
      const fetch = new Fetch(url);

      return fetch.returnValue();
    }
  };
}

export default RL;

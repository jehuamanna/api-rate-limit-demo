import axios from 'axios'
class Fetch {
    // console.log(url);
    constructor(url, urlMap, limit) {
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
          url
        );
      }
    }
    setValue(value) {
      this.value = value;
    }
    returnValue() {
      return new Promise(
        function (resolve, reject) {
          this.interval = setInterval(function () {
            if (this.value) {
              resolve(this.value);
              clearInterval(this.interval);
            } else {
              this.returnValue();
            }
          }.bind(this), 1000);
        }.bind(this)
      );
    }
  }

  export default Fetch;
import axios from "axios";
class Fetch {
  constructor(url, urlMap, limit) {
    this.value = null;
    const add = url.split("//")[1].split("/")[0];
    const myUrlMap = urlMap[add];
    const axiosPromise = () => axios.get(url);

    myUrlMap.pendingPromises.add(
      { axiosPromise, setValue: this.setValue.bind(this) },
      url
    );
  }
  setValue(value) {
    this.value = value;
  }
  returnValue() {
    return new Promise(
      function (resolve, reject) {
        this.interval = setInterval(
          function () {
            if (this.value) {
              resolve(this.value);
              clearInterval(this.interval);
            }
          }.bind(this),
          0
        );
      }.bind(this)
    );
  }
}

export default Fetch;

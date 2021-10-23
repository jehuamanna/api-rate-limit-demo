import Queue from "./queue";
import PendingPromises from "./pending-promises";
import Fetch from './fetch'


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

  
  return {
    fetch: (url) => {
      const fetch = new Fetch(url, urlMap, limit);

      return fetch.returnValue();
    }
  };
}

export default RL;

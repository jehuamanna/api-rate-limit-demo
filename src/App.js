import { useEffect, useState } from "react";
import "./styles.css";
import RL from "./rate-limiter";

const LIMIT = 2;
const API_CALLS = 200;
export default function App() {
  const [list, setList] = useState([]);
  const handleClick = async (index) => {
    RL("https://jsonplaceholder.typicode.com/users/1", LIMIT)
      .fetch(
        "https://jsonplaceholder.typicode.com/users/" +
          (((index || 1) % 10) + 1).toString(),
        index
      )
      .then((res) => {
        console.log(res.data.name);
        setList((prevList) => prevList.concat(res?.data?.name));
      });
  };
  useEffect(() => {
    for (let i = 0; i < API_CALLS; i++) {
      handleClick(i);
    }
  }, []);
  return (
    <div className="App">
      <input onClick={() => setList([])} type="button" value="clear me" />

      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
}

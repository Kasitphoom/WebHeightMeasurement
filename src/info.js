import Axios from "axios";
import { useState } from "react";

const Info = () => {
  const [user, setUser] = useState([]);
  const getuser = () => {
    Axios.get("http://localhost:3001/user").then((response) => {
      setUser(response.data);
    });
  };
  return (
    <div className="info" id="info">
      <button onClick={getuser}>GetUser</button>
      <h1>User Info</h1>
      {user.map((val, key) => {
        return (
          <div className="users">
            <p>Email: {val.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Info;

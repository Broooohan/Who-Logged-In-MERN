import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Heading from "./Heading";

import { UserContext } from "../App";

const Home = () => {
  const {state, dispatch} = useContext(UserContext);

  const [users, setUser] = useState([]);

  const callHomePage = async () => {
    try {
      const res = await axios.get("/home");

      let hehe = Object.values(res.data);
      console.log(Object.values(hehe)); //Converts object of objects to array of arrays
      setUser(hehe);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <>
      <div className="homebg">
        <p className="homep">WELCOME</p>
        <h3 className="homeh">
          These are the users that have created an account on my website
        </h3>
        {users.map((user) => (
          <div className="homecard">
            <div className="homename">
              <h3>{user.name}</h3>
            </div>
            <div className="homeemail">
              <h3>{user.email}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

// const callHomePage = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       }
//     });

//     datas = await res.json();
//     // setUser(datas[0]);
//     console.log(datas);
//     if (!res.status === 200) {
//       const error = new Error(res.error);
//       throw error;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// https://randomuser.me/api/?results=5

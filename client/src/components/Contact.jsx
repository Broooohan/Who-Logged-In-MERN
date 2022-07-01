import React , {useEffect , useState, useContext} from "react";
import conemail from "../pictures/conemail.png";
import conadd from "../pictures/conadd.png";
import conphone from "../pictures/conphone.png";
import "bootstrap/dist/css/bootstrap.css";

import { UserContext } from "../App";

const Contact = () => {

  const {state, dispatch} = useContext(UserContext);

  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");

  const callContactPage = async () => {
    try {
      const res = await fetch("/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      setUser(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }else{
        dispatch({type:"USER" , payload:true})
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  const sendData = async (e) =>{
    e.preventDefault();

    const res = await fetch("/msg", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        msg
      })
    })

    const data = await res.json();
    console.log(res);

    if (res.status === 422) {
      alert("Message not sent");
    }else if (res.status === 401) {
      alert("Login First");
    }else{
      alert("Message sent");
      setMsg("");
    }
  }

  return (
    <div className="outer-contact d-flex align-items-center">
      <div className="upper-con">
        <div className="con">
          <div className="cimg">
            <img src={conphone}></img>
          </div>
          <div className="ctext">
            <div className="chead">Phone</div>
            <div>6376014387</div>
          </div>
        </div>

        <div className="con">
          <div className="cimg">
            <img src={conemail}></img>
          </div>
          <div className="ctext">
            <div className="chead">Email</div>
            <div>rohanrouthcob@gmail.com</div>
          </div>
        </div>

        <div className="con">
          <div className="cimg">
            <img src={conadd}></img>
          </div>
          <div className="ctext">
            <div className="chead">Adress</div>
            <div>Jaipur, Rajasthan</div>
          </div>
        </div>
      </div>

      <div className="middle-contact">
        <div className="conhead">
          <h1>Get in Touch</h1>
        </div>
        <form className="condataform" method="POST">
          <div className="condata1">
            <div className="condetail">
              <input type="text" placeholder="Phone" value={user.name}></input>
            </div>
            <div className="condetail">
              <input type="text" placeholder="Email" value={user.email}></input>
            </div>
            <div className="condetail">
              <input type="number" placeholder="Phone Number" value={user.phone}></input>
            </div>
          </div>
          <div className="conmsg">
            <textarea placeholder="Message" name="msg" value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
          </div>
          <div className="conbtn">
            <button type="submit" className="btn btn-primary btn-md" onClick={sendData}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

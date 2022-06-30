import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../pictures/login.svg";
import email from "../pictures/email.png";
import password from "../pictures/password.png";
import "bootstrap/dist/css/bootstrap.css";

import { UserContext } from "../App";

const Login = () => {

const {state, dispatch} = useContext(UserContext);

const navigate = useNavigate()

const [mail, setMail] = useState("");
const [pass, setPass] = useState("");

const postLogin = async (e) =>{
  e.preventDefault();

  const res = await fetch("/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
      email:mail, //email here is the name feild of input tag, mail is the data. If bothe are same we can write just that name
      password:pass
    })
  })

  const data = await res.json();

  if (res.status === 400 || !data || res.status === 422) {
    window.alert("Login unsuccessful");
  }else{
    dispatch({type:"USER" , payload:true})
    window.alert("Login successful")
    navigate("/")
  }
}

  return (
    <>
      <div className="signup-outer">
        <div className="signup-middle">
        <div className="signup-inner2">
            <img src={login} alt="" className="signup-img" />
            <Link className="alternate" to="/signup">Create an account</Link>
          </div>
          <div className="signup-inner1">
            <h1>Login</h1>
            <form className="login-form" method="POST">
              <div>
                <label htmlFor="email">
                  <span>
                    <img src={email} alt="" className="account-img" />
                    {/* Email */}
                  </span>
                </label>
                <input type="email" name="email" placeholder="Email" className="loginput" value={mail} onChange={(e) => setMail(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="password">
                  <span>
                    <img src={password} alt="" className="account-img" />
                    {/* Password */}
                  </span>
                </label>
                <input type="password" name="password" placeholder="Password" className="loginput" value={pass} onChange={(e) => setPass(e.target.value)}></input>
              </div>
              <div>
                <button
                  type="submit"
                  name="signup"
                  id="signup"
                  class="btn btn-primary btn-md btn-block"
                  value="signup"
                  onClick={postLogin}
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import register2 from "../pictures/register2.svg";
import account from "../pictures/account.svg";
import email from "../pictures/email.png";
import phone from "../pictures/phone.png";
// import work from "../pictures/work.png";
import password from "../pictures/password.png";
import cpassword from "../pictures/cpassword.png";
import "bootstrap/dist/css/bootstrap.css";

const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInput = (e) => {
    // console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      })
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid registration");
      console.log("Invalid registration");
    }else{
      window.alert("Successful registration");
      console.log("Successful registration");
      navigate("/login")
    }
  };

  // const [hehe, setHehe] = useState()
  // Just experimenting with hooks
  // const testFxn = (x) => {
  //   x.preventDefault();
  //   setHehe(user.name)
  // }

  return (
    <>
      <div className="signup-outer">
        <div className="signup-middle">
          <div className="signup-inner1">
            <h1>Signup</h1>
            <form className="signup-form" method="POST">
              <div>
                <label htmlFor="name">
                  <span>
                    <img src={account} alt="" className="account-img" />
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                ></input>
              </div>
              <div>
                <label htmlFor="email">
                  <span>
                    <img src={email} alt="" className="account-img" />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  alue={user.email}
                  onChange={handleInput}
                ></input>
              </div>
              <div>
                <label htmlFor="phone">
                  <span>
                    <img src={phone} alt="" className="account-img" />
                    Phone
                  </span>
                </label>
                <input
                  type="number"
                  name="phone"
                  alue={user.phone}
                  onChange={handleInput}
                ></input>
              </div>
              {/* <div>
                <label htmlFor="work">
                  <span>
                    <img src={work} alt="" className="account-img" />
                    Work
                  </span>
                </label>
                <input type="text" name="work"></input>
              </div> */}
              <div>
                <label htmlFor="password">
                  <span>
                    <img src={password} alt="" className="account-img" />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  alue={user.password}
                  onChange={handleInput}
                ></input>
              </div>
              <div>
                <label htmlFor="cpassword">
                  <span>
                    <img src={cpassword} alt="" className="account-img" />
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  alue={user.cpassword}
                  onChange={handleInput}
                ></input>
              </div>
              <div>
                <button
                  type="submit"
                  name="signup"
                  id="signup"
                  class="btn btn-primary btn-md btn-block"
                  value="signup"
                  // onClick={testFxn}
                  onClick={PostData}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="signup-inner2">
            <img src={register2} alt="" className="signup-img" />
            <Link className="alternate" to="/login">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

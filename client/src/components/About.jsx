import React, { useEffect , useState , useContext} from "react";
import { useNavigate  } from "react-router-dom";
import profilepic from "../pictures/profilepic.svg";

import { UserContext } from "../App";

const About = () => {

  const navigate = useNavigate();

  const {state, dispatch} = useContext(UserContext);

  const[user, setUser] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUser(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }else{
        dispatch({type:"USER" , payload:true})
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="about-outer">
        <div className="about-middle">
          <form className="about-form" method="GET">
            <div className="about-inner-up">
              <div className="about-inner-up-1">
                <img src={profilepic} alt=""></img>
              </div>
              <div className="about-inner-up-2">
                <div className="about-inner-up-2-up">
                  <h3>{user.name}</h3>
                  <h5>Profession</h5>
                </div>
                <div className="about-inner-up-2-down">
                  <h4>About</h4>
                </div>
              </div>
              <div className="about-inner-up-3">
                <button className="btn btn-danger btn-md" type="submit">
                  Edit profile
                </button>
              </div>
            </div>
            <div className="about-inner-down">
              <div className="about-inner-down-1">
                <ul>
                  <li>
                    <a href="">Insta</a>
                  </li>
                  <li>
                    <a href="">LinkedIn</a>
                  </li>
                  <li>
                    <a href="">Youtube</a>
                  </li>
                  <li>
                    <a href="">Github</a>
                  </li>
                  <li>
                    <a href="">Facebook</a>
                  </li>
                  <li>
                    <a href="">My Webiste</a>
                  </li>
                  <li>
                    <a href="">Snapchat</a>
                  </li>
                </ul>
              </div>
              <div className="about-inner-down-2">
                <h6>UserID</h6>
                <h6>Name</h6>
                <h6>Email</h6>
                <h6>Phone</h6>
                <h6>Proffesion</h6>
              </div>
              <div className="about-inner-down-3">
                <h6>{user._id}</h6>
                <h6>{user.name}</h6>
                <h6>{user.email}</h6>
                <h6>{user.phone}</h6>
                <h6>.......</h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;

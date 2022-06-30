const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate")
// const alldata = require("../middleware/alldata")
const cookieParser =require("cookie-parser");


// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

router.use(cookieParser());

require("../db/connection");
const User = require("../model/userSchema");

router.get("/", async (req, res) => {
  res.send("Hello from home")
});

router.get("/home", async (req, res) => {
  console.log("This is home from server");
  const existData = await User.find({},{_id:0});
  let x = {...existData};
  // console.log(x);
  res.json(x);
});

router.post("/signup", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  console.log(name);

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all properties" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      //yaha pe password hash krna hai

      const userRegister = await user.save();

      if (userRegister) {
        return res.status(201).json({ message: "user registered succuessfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  let token
  const { email, password } = req.body;
  // res.json({ message: "Thanks" });
  // console.log(email);

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Plz fill all properties" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ message: "Invalid cred" });
        console.log(userLogin);
      } else {
        token = await userLogin.generateAuthToken();
        // console.log(token);

        res.cookie("jwtoken" , token, {
          expires:new Date(Date.now() + 25892000000),
          httpOnly:true
        });

        res.json({ message: "Login successful" });
        // console.log(userLogin);
      }
    } else{
        res.status(400).json({error:"Invalid cred"})
    }
  } catch (err) {
    // console.log(err);
  }
});

router.get("/about", authenticate , async (req, res) => {
  console.log("This is my about page");
  res.send(req.rootUser)
  // console.log(req.rootUser);
});

router.get("/contact", authenticate , async (req, res) => {
  console.log("This is my contact page");
  res.send(req.rootUser)
  // console.log(req.rootUser);
});

router.post("/msg", authenticate, async (req, res) => {
  try {
    const msg = req.body;
    // res.send(msg)
    if(!(msg.msg)){
      console.log("No msg");
      return res.status(422).json("Pls fill the contact form");
    }

    const userContact = await User.findOne({_id: req.userID})

    if (userContact) {
      const userMsg = await userContact.addMsg(msg);

      await userContact.save();
      res.status(201).json({message:"User contact created successfully"})

    }

  } catch (err) {
    res.status(401).send("login to send msg")
    console.log(err);
  }
});

router.get("/logout" , (req,res) => {
  console.log("Hello from Logout page");
  res.clearCookie('jwtoken', {path:'/'})
  res.status(200).send("Logout successful");
})

module.exports = router;

// Below is router for signup post storing in DB using promises

// router.post("/signup", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   console.log(name);

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.json({ error: "Plz fill all properties" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.json({ error: "Email already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.json({ message: "Successfullly stored in DB" });
//         })
//         .catch((err) => res.json({ error: "failed to register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

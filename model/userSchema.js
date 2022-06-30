const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  // work: {
  //   type: String,
  //   required: true,
  // },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      msgs: {
        type: String,
        required: true,
      }
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//we are hashing password

userSchema.pre("save", async function (next) {
  console.log("hiiiii");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//We are generating token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    console.log(token);
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

//Storing msgs

userSchema.methods.addMsg = async function (msg) {
  let whisp = msg.msg;
  try {
    this.messages = this.messages.concat({msgs:whisp});
    console.log(whisp.msg);
    await this.save();
    return this.messages;
  } catch (err) {
    console.log("HERE is the msg");
    console.log(whisp);
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;

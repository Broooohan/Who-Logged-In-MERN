const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// app.use(
//   cors({
//     origin:"*"
//   })
// )

dotenv.config({ path: "./config.env" });
require("./db/connection");
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

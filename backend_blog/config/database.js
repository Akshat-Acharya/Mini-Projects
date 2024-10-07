const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("connection hogaya"))
    .catch((error) => {
      console.log("error hai");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDB;
const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connection hogaya"))
    .catch((err) => {
      console.log(err);
      console.log("Error hai bhai");
      process.exit(1);
    });
};

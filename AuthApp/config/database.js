const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connection hogya"))
    .catch((error) => {
      console.log("Error hai jee ", error);
      process.exit(1);
    });
};

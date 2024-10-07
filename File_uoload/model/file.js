const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `Codehelp`,
      to: doc.email,
      subject: "New file uploaded on cloudinary",
      html: `<h2>Hello jee </h2> <p>File uploaded</p> View here <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
    });
  } catch (err) {
    console.log(err);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;

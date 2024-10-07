const File = require("../model/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "Local file uploaded successfully ",
    });
  } catch (err) {
    console.log(err);
  }
};

function isFileType(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadToCloudinary(file, folder,quality) {
  const options = { folder };

  if(quality){
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported ",
      });
    }

    const response = await uploadToCloudinary(file, "tutorial");
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Entry created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};


exports.videoUpload = async (req,res) => {
  try{

    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported ",
      });
    }
    const response = await uploadToCloudinary(file, "tutorial");
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Entry created successfully",
    });

  }
  catch(err){
    console.log(err);
  }
}

exports.imageReducerUpload = async (req,res) => {
  try{

    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported ",
      });
    }
    const response = await uploadToCloudinary(file, "tutorial",40);
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Entry created successfully",
    }); 

  }
  catch(err){
    console.log(err);
  }
}
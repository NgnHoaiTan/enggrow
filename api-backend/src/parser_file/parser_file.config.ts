const path = require("path");
const multer = require("multer");
const DataURIParser = require("datauri/parser");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

const dUri = new DataURIParser();

const dataUri = (req) =>{
    return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}
  

module.exports = {
  multerUploads,
  dataUri,
};
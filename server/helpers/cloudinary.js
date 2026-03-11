const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new multer.memoryStorage();

async function ImageUploadUtil(fileBuffer) {
  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
}

const upload = multer({storage});
module.exports = {upload, ImageUploadUtil}

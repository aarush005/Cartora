const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
//cloudinary details
    // api name
    // api secret
    // api key
})

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
}

const upload = multer({storage});
module.exports = {upload, ImageUploadUtil}

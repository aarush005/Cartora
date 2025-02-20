const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
    cloud_name: 'dznu5rjvt',
    api_key: '792666622311181',
    api_secret: 'Wuc6fgZeZ3CBNMtpXC83iWY63fk'
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
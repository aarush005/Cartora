const express = require('express');

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct
}
 = require('../../controllers/admin/products_controllers')
const {upload} = require('../../helpers/cloudinary')

const router = express.Router();

router.post("/upload-image", upload.single("my-file"), (req, res, next) => {
    try {
      handleImageUpload(req, res);
    } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error uploading image" });
    }
  });
  router.post('/add', addProduct)
  router.post('/edit/:id', editProduct)
  router.post('/delete/:id', deleteProduct)
  router.post('/get', fetchAllProducts)
  
module.exports = router;

const express = require('express');

const {
  getFilteredProducts,
}
 = require('../../controllers/shop/products_controllers')

const router = express.Router();

router.get("/get", getFilteredProducts)
  
module.exports = router;

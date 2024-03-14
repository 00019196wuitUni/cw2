const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')


router.get("/", controller.indexPage)
router.get("/addPage", controller.addProductPage)
router.post("/createProduct", controller.createFunction)
router.get("/listOfProducts", controller.listOfProductsRender)
router.get("/remove/:id", controller.removeProduct)


module.exports = router
const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.roter');
const routerProduct = require('./product.router');
const router = express.Router();

// colocar las rutas aquí
//? USERS
router.use('/users', routerUser)
//? CATEGORY
router.use('/categorys', routerCategory)
//? PRODUCT
router.use('/products', routerProduct)

module.exports = router;
const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.roter');
const routerProduct = require('./product.router');
const routerCart = require('./cart.roter');
const { verifyJwt } = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
//? USERS
router.use('/users', routerUser)
//? CATEGORY
router.use('/categorys', routerCategory)
//? PRODUCT
router.use('/products', routerProduct)
//? CART
router.use('/cart', verifyJwt, routerCart)
//? PURCHASE
router.use('/purchase',verifyJwt, routerPurchase)

module.exports = router;
const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

//TODOS RELACIONES DE UNO A MUCHOS (N-M)

Product.belongsTo(Category) //! FK categoryID
Category.hasMany(Product)

//! cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

//! cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//! Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//! Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)


//TODOS RELACIONES DE MUCHOS A MUCHOS (M-M)
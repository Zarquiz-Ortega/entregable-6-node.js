const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

//TODOS RELACIONES DE UNO A MUCHOS (N-M)

Product.belongsTo(Category) //! FK categoryID
Category.hasMany(Product)

//! cart -> userId
Cart.belongsTo(User)
Cart.hasMany(User)

//! cart -> productId
Cart.belongsTo(Product)
Cart.hasMany(Product)


//TODOS RELACIONES DE MUCHOS A MUCHOS (M-M)
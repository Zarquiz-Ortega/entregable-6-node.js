const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
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


//TODOS RELACIONES DE MUCHOS A MUCHOS (M-M)
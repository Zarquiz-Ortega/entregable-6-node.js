const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Product.belongsTo(Category) //! FK categoryID
Category.hasMany(Product)
const AdressType = require('./AdressType');
const Order_type_adress = require('./Order_type_adress');
const Adress = require('./Adress');
const Category = require('./Category');
// const Order_adressType = require('./Order_adressType');
const Order_product = require('./Order_product');
const OrderState = require('./OrderState');
const Order = require('./Order');
const Product = require('./Product');
const Role = require('./Role');
const TVA = require('./TVA');
const User = require('./User');


// ASSOCIATIONS


/************ ONE TO MANY *************/

Order.hasMany(Order_type_adress, {
    foreignKey: 'order_id',
    as: 'order_type_adress'
});

Order_type_adress.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'orders'
});

Adress.hasMany(Order_type_adress, {
    foreignKey: 'adress_id',
    as: 'order_type_adress'
});

Order_type_adress.belongsTo(Adress, {
    foreignKey: 'adress_id',
    as: 'adresses'
});

AdressType.hasMany(Order_type_adress, {
    foreignKey: 'adress_type_id',
    as: 'order_type_adress'
});

Order_type_adress.belongsTo(AdressType, {
    foreignKey: 'adress_type_id',
    as: 'adress_type'
});




Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'roles',
});


User.hasMany(Adress, {
    foreignKey: 'user_id',
    as: 'adresses',
});

Adress.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});


User.hasMany(Category, {
    foreignKey: 'created_by',
    as: 'categories'
});

Category.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});

User.hasMany(TVA, {
    foreignKey: 'created_by',
    as: 'tva'
});

TVA.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});


User.hasMany(Product, {
    foreignKey: 'created_by',
    as: 'products'
});

Product.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});


Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'categories'
});


TVA.hasMany(Product, {
    foreignKey: 'tva_id',
    as: 'products',
});

Product.belongsTo(TVA, {
    foreignKey: 'tva_id',
    as: 'tva',
});


User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});


OrderState.hasMany(Order, {
    foreignKey: 'order_states_id',
    as: 'orders',
});

Order.belongsTo(OrderState, {
    foreignKey: 'order_states_id',
    as: 'order_states'
});

Product.hasMany(Order_product, {
    foreignKey: 'product_id',
});

Order_product.belongsTo(Product, {
    foreignKey: 'product_id',
});

Order.hasMany(Order_product, {
    foreignKey: 'order_id',
});

Order_product.belongsTo(Order, {
    foreignKey: 'order_id',
});




/************ MANY TO MANY *************/


Product.belongsToMany(Order, {
    as: 'orders',
    // la table de liaison
    through: Order_product,
    foreignKey: 'product_id',
    otherKey: 'order_id'
});
  

Order.belongsToMany(Product, {
    as: 'products',
    through: Order_product,
    foreignKey: 'order_id',
    otherKey: 'product_id'
});


module.exports = { Adress, AdressType, Category, Order_product, Order_type_adress, Order, OrderState, Product, Role, TVA, User}
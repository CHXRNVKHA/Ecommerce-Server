const Sequelize = require('sequelize');

const sequelize = new Sequelize('mega_shop_updated', 'root', '3334618', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
      timestamps: false
    },
});

//sequelize.sync();

module.exports = sequelize;
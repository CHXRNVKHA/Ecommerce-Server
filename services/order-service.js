const {database} = require('../config/helpers');

const getAll = function (req) {
    return database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id',
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id',
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id',
            },
        ])
        .withFields(['o.id', 'p.title as name', 'p.description', 'p.price', 'u.username'])
        .sort({id: 1})
        .getAll()
        .then(orders => {
            return orders;
        }).catch(err => console.log(err));
}

module.exports = {
   getAll,
}
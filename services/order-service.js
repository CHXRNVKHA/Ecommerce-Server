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

const getById = function (req) {
    let orderId = req.params.orderId;

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
        .filter({'o.id': orderId})
        .getAll()
        .then(orders => {
            return orders;
        }).catch(err => console.log(err));
}

const add = function(req, res) {
    let {userId, products} = req.body;
    
    if (userId != null && userId > 0 && !isNaN(userId)) {
        database.table('orders')
            .insert({
                user_id: userId,
            }).then(newOrderId => {
                if (newOrderId > 0) {
                    products.forEach(async (p) => {
                        let data = await database.table('products').filter({id: p.id}).withFields(['quantity']).get();
                        let inCart = p.incart;

                        if (data.quantity > 0) {
                            data.quantity -= inCart;
                            if (data.quantity < 0) {
                                data.quantity = 0;
                            }
                        } else {
                            data.quantity = 0;
                        }

                        database.table('orders_details')
                            .insert({
                                'order_id': newOrderId,
                                'product_id': p.id,
                                'quantity': inCart,
                            }).then(newId => {
                                database.table('products')
                                    .filter({id: p.id})
                                    .update({
                                        quantity: data.quantity
                                    }).then(successNum => {}).catch(err => console.log(err));
                            }).catch(err => console.log(err));
                    })
                } else {
                    res.json({message: 'New order fails while adding order details', success: false});
                }
                res.json({
                    message: `Order succesfully placed with order id ${newOrderId}`,
                    success: true,
                    order_id: newOrderId,
                    products: products,
                })
            }).catch(err => console.log(err));
    } else {
        res.json({message: 'New order fails', success: false});
    }
}

module.exports = {
   getAll,
   getById,
   add,
}
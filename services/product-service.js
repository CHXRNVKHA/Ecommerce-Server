const {database} = require('../config/helpers');

const getAll = function (req) {
    let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 1;
    let limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : 10;

    let startVal;
    let endVal;

    if (page > 0) {
        startVal = (page * limit) - limit;
        endVal = page * limit;
    }
    else {
        startVal = 0; 
        endVal = 10;
    }

    database.table('products as p')
        .join([{
            table: 'categories as c',
            on: 'c.id = p.cat_id',
        }])
        .withFields([
            'c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.id',
        ])
        .slice(startVal, endVal)
        .sort({ id: .1 })
        .getAll()
        .then(prods => {
            console.log(prods);
            return prods;
        }).catch(err => console.log(err));
}

module.exports = {
    getAll,
}
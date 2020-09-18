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

    return database.table('products as p')
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
            return prods;
        }).catch(err => console.log(err));
}

const getById = function (req) {
    let prodId = req.params.prodId;

    return database.table('products as p')
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
            'p.images',
            'p.id',
        ])
        .filter({'p.id' : prodId})
        .get()
        .then(prod => {
            return prod;
        }).catch(err => console.log(err));
}

const getByCat = function (req) {
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

    const cat_title = req.params.catName;

    return database.table('products as p')
        .join([{
            table: 'categories as c',
            on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`,
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
            return prods;
        }).catch(err => console.log(err));
}

module.exports = {
    getAll,
    getById,
    getByCat,
}
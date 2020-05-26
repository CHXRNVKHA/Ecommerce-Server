const MySqli = require('mysqli');

const conn = new MySqli({
    host: 'localhost',
    post: 3306,
    user: 'root',
    pass: '3334618',
    db: 'mega_shop_updated',
});

let db = conn.emit(false, '');

module.exports = {
    database: db,
}
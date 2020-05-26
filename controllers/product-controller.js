const service = require('../services/product-service');
class ProductController {
    constructor(){};
    getAllProducts = async (req, res) => {
        try {
            const result = await service.getAll(req);
            res.send(result);
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    };
}

module.exports = ProductController;
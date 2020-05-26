const service = require('../services/product-service');
class ProductController {
    constructor(){};
    getAllProducts = async (req, res) => {
        try {
            const result = await service.getAll(req);
            if (result.length > 0) {
                res.status(200).json({
                    count: result.length,
                    products: result,
                });
            }
            else {
                res.json({message: 'No products founds'});
            }
            res.send(result);
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    };
}

module.exports = ProductController;
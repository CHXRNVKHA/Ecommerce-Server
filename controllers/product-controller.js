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
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    };

    getProdById = async (req, res) => {
        try {
            const result = await service.getById(req);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.json({message: `No product found with product id ${req.params.prodId}`});
            }
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }

    getProdsByCategory = async (req, res) => {
        try {
            const result = await service.getByCat(req);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.json({message: `No products found from ${req.params.catName} category`});
            }
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = ProductController;
import Product from '../model/product.js';

// @desc    Get all products
// @route   GET /api/product
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/product/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/product
export const createProduct = async (req, res) => {
    const { ProductName, ProductCode, Price, Stock, Thumbnail, Description } = req.body;

    try {
        const newProduct = new Product({
            ProductName,
            ProductCode,
            Price,
            Stock,
            Thumbnail,
            Description
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating product',
            error: error.message
        });
    }
};

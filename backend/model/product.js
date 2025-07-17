// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true
    },
    ProductCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Stock: {
        type: Number,
        required: true,
        min: 0
    },
    Thumbnail: {
        type: String,  // URL or filename
        required: false
    },
    Description: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

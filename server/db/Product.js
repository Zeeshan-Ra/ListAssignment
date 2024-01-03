const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    userId:String,
});

module.exports = mongoose.model("products", productSchema);
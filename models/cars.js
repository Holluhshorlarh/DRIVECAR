const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: [true, "Please provide a name for this car."],
    unique: true,
    trim: true,
    maxLength: [20, "Name must be less than 20 characters."],
  },
  carCategory: {
    type: String,
    required: [true, "Please provide a category for this product."],
    enum: ["Vegetables", "Fruits", "Dairy Products", "Meat Products", "Poultry", "Fish and Seafood", "Grains and Cereals", "Nuts and Seeds", "Herbs and Spices", "Other"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please provide a price for this product."],
  },
});

module.exports = mongoose.model("Product", ProductSchema);

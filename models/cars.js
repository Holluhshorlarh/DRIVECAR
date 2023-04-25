const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: [true, "Please provide a category for this product."],
        enum: ["Toyota Camry", "Dodge Charger", "Mercedes Benz", "Kia Rio", "Hyundai", "Range Rover"],
      },
  rentPrice: {
    type: Number,
    required: [true, "Please provide a price for this product."],
  },
});

module.exports = mongoose.model("Car", carSchema);

const mongoose = require('mongoose');
const Car = require('../models/cars');

exports.postCar = async (req, res) => {
  try {
    const { carName, rentPrice } = req.body;
    const existingCar = await Car.findOne({ carName });

    if (existingCar) {
      return res.status(409).json({
        success: false,
        error: "This car already exists.",
      });
    }

    const newCar = new Car(req.body);
    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      data: savedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedCar,
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const { pool } = require('../config/database');
const axios = require("axios")

exports.postCar = async (req, res) => {
  try {
    const { car_name, car_year, hire_price } = req.body;

    const existingCarQuery = {
      text: 'SELECT * FROM cars WHERE car_name = $1',
      values: [car_name],
    };
    const existingCarResult = await pool.query(existingCarQuery);

    if (existingCarResult.rowCount > 0) {
      return res.status(409).json({
        success: false,
        error: 'This car already exists.',
      });
    }

    const newCarQuery = {
      text: 'INSERT INTO cars(car_name, hire_price, car_year) VALUES($1, $2, $3) RETURNING *',
      values: [car_name, car_year, hire_price],
    };
    const savedCarResult = await pool.query(newCarQuery);

    res.status(201).json({
      success: true,
      data: savedCarResult.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.makePayment = async (req, res) => {
  const {amount, email, car_id, user_id} = req.body;
  try {
    const paystackInstance = await axios.create({
      baseURL: "https://api.paystack.co",
      headers: {
        Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const url = "/transaction/initialize";

    const paystackAmount = amount + "00"

    const receipt = {
      email,
      amount: paystackAmount,
      callback_url: "http://localhost:8088"
    }

    const response = await paystackInstance.post(url, receipt);

    const savePaymentData = await pool.query("INSERT INTO payment (car_id, user_id, payment_ref, amount) VALUES ($1, $2, $3, $4) RETURNING *", [car_id, user_id, response.data.data.reference, Number(amount)])
    return res.status(200).json({payment_url: response.data.data.authorization_url, data: savePaymentData.rows[0]})
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message)
  }
}

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const updateCarQuery = {
      text: 'UPDATE cars SET car_name = $1, rent_price = $2, car_year = $3 WHERE id = $4 RETURNING *',
      values: [req.body.carName, req.body.rentPrice, req.body.carYear, id],
    };
    const updatedCarResult = await pool.query(updateCarQuery);

    if (updatedCarResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCarResult.rows[0],
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

    const deleteCarQuery = {
      text: 'DELETE FROM cars WHERE id = $1 RETURNING *',
      values: [id],
    };
    const deletedCarResult = await pool.query(deleteCarQuery);

    if (deletedCarResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Car not found',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedCarResult.rows[0],
      message: 'Car deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAvailableCars = async (req, res) => {
  try {
    let page = req.query.page || 1;
    const limit = 5;
    page = Number(page);
    const skip = (page - 1) * limit;

    const availableCarsQuery = {
      text: 'SELECT * FROM cars WHERE available_for_hire = $1 LIMIT $2 OFFSET $3',
      values: [true, limit, skip],
    };

    const countQuery = {
      text: 'SELECT COUNT(*) FROM cars WHERE available_for_hire = $1',
      values: [true],
    };

    const { rows } = await pool.query(availableCarsQuery);
    const availableCars = rows;

    const countResult = await pool.query(countQuery);
    const count = countResult.rows[0].count;

    res.status(200).json({
      success: true,
      data: availableCars,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

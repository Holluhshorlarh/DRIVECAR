CREATE TABLE IF NOT EXISTS payment (
  id SERIAL PRIMARY KEY,
  car_id INTEGER,
  user_id INTEGER,
  payment_ref VARCHAR(255) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Pending',
  payment_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

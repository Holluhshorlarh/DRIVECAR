
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  car_name VARCHAR(255) NOT NULL,
  car_year INTEGER NOT NULL,
  hire_price NUMERIC(10, 2) NOT NULL
);

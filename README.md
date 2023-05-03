## DriveCar
---
DriveCar is a web application that helps people find and rent cars from local car rental companies. It allows users to browse available cars, compare prices, and book reservations online.

---

#### Postman documentation
https://documenter.getpostman.com/view/25826735/2s93eR3aKD

#### Features

-  Users can sign up 

-  Users can search for available cars 

- Users can select a car, choose a rental period, and book a reservation online.

- Users can securely pay for their reservation using their credit card.

- Users can hire cars and delete car hire order
---

### Endpoints 

- ROUTER.POST('/car', isAuth, isAdmin, postCar); This logic creates cars that will be available for hire to users and takes isAuth middleware to ensure that whoever is performing the operation is logged in, isAdmin for authorization to ensure that the operation can only be performed by an Admin.

- ROUTER.PUT('/car/:id', isAuth, isAdmin, updateCar); this logic was implemented to give room for car information details manipulation and it takes isAuth middleware to ensure that whoever is performing the operation is logged in, isAdmin for authorization to ensure that the operation can only be performed by an Admin.

- ROUTER.DELETE('/car/:id', isAuth, isAdmin, deleteCar);
router.get('/available-cars', getAvailableCars);
router.post('/payment', makePayment);
---

DriveCar is built using the following technologies:

- Node.js: A server-side JavaScript runtime environment used to build the backend of the application.
- Express: A web application framework for Node.js used to handle routing and middleware.
- MongoDB: A NoSQL database used to store user information, car information, and reservation information.
- Mongoose: A MongoDB object modeling tool used to define schema and interact with the database.

#### Getting Started
To get started with DriveCar, you will need to have Node.js and MongoDB installed on your machine. Then, follow these steps:

Clone the repository to your local machine.
Install dependencies using npm install.
Create a .env file in the root directory and set the following environment variables:

Fork the repository and create a new branch for your feature.
Implement your feature and write tests for it.
Ensure all tests are passing by running npm test.
Submit a pull request with a detailed explanation of your changes.

#### License
DriveCar is licensed under the MIT License.
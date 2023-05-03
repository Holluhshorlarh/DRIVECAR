require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const messagesMiddleware = require('./middleware/messagesMiddleware');
const { connectDB } = require("./config/database");
const dashboardController = require('./controller/dashboardController');


const app = express();
const port = process.env.PORT;

//passport config
require("./controller/passport")(passport);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// set up messages middleware
app.use(messagesMiddleware);

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.get('/dashboard', dashboardController.dashboard);
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

// Connect to MongoDB
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./config/db");
require("dotenv").config()

const app = express();
const port = process.env.PORT

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//static folder
app.use(express.static(path.join(__dirname, 'public')))

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));

// Connect to MongoDB
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});

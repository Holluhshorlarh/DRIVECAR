require("dotenv").config();
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const messagesMiddleware = require('./middleware/messagesMiddleware');
const { connectDB } = require("./config/database");
const dashboardController = require('./controller/dashboardController');
const fs = require('fs');
require('./config/passport')(passport)




// Create the logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true.valueOf,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24 // session data will be automatically deleted after 1 day of inactivity
  })
}));

// set up messages middleware
app.use(messagesMiddleware);

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.get('/dashboard', dashboardController.dashboard);
app.use('/', require('./routes/user.routes'));


// connect to MongoDB
connectDB();

// start server
app.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});

const express = require("express");
require("dotenv").config();
const exphbs = require('express-handlebars');
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require('./config/db').pool;

const app = express();

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.use('/', require('./routes/index'))

app.use('/auth', require('./router/auth'))

app.use(cors());
app.use(helmet());

require("./config/passport")(passport);

connectDB()

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})

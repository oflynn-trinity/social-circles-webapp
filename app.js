const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const indexRouter = require('./routes/index');
const accountRoutes = require('./routes/accountRoutes');
require('dotenv').config();

module.exports = app;

// Setup middleware in correct order:
app.use(express.urlencoded({ extended: true })); // <-- Move this UP
app.use(express.json());                         // <-- Move this UP
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');

// Register routes AFTER middleware is set up
app.use('/', accountRoutes);
app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
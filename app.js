const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const accountRoutes = require('./routes/accountRoutes');
app.use('/account', accountRoutes);

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',indexRouter);

// Import routes
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/session', sessionRoutes);

// Default route
//app.get('/', (req, res) => {
   // res.sendFile(path.join(__dirname, 'public/index.html'));
//});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

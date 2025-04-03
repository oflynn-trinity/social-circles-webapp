const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', indexRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

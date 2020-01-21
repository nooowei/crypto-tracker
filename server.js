var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('client/build'));

// // const uri = process.env.MONGOLAB_URI;
// const uri = config.get('MONGOLAB_URI');
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// server will serve up index.html in the build folder if in production
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

// app.use('/', indexRouter);
app.use('/users', usersRouter);



// //serve static asset if in production
// if(process.env.NODE_ENV === 'production'){
//   console.log("Production environment. Serving static asset from client/build.");
//   // Set static folder
//   app.use(express.static('client/build'));

//   // server will serve up index.html in the build folder if in production
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   })
// }

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;

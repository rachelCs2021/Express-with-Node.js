const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles-api.s8vf2mx.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log('MongoDB Connected');
})

const articlesRoutes = require('./api/routes/articles')
const categoriesRoutes = require('./api/routes/categories')
const usersRoutes = require('./api/routes/users')

app.use(morgan("dev"))
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X_Requested-With, Content-Type, Accept, Authorization")
  if (req.method === "OPTIONs") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
      res.status(200).json({})
  }
  next()
})

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "hello rachel",
//   });
// });

// app.post("/articles", (req, res) => {
//   res.status(200).json({
//     message: "post request",
//   });
// });

app.use('/articles', articlesRoutes)
app.use('/categories', categoriesRoutes)
app.use('/users', usersRoutes)

app.use((req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

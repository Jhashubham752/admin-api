var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require("cors");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();

var cmsRouter = require("./routes/Cms");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/Category");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", cmsRouter);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// ========================db connection ====================

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb database connection established successfully !!");
});
// app.listen(process.env.PORT, (err) => {
//   if (err) throw err;
//   console.log(` my server is running on port number ${process.env.PORT}`);
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

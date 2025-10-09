 const ENV = process.env.NODE_ENV || 'production';
 require('dotenv').config({
  path: `.env.${ENV}`
 });

// Core Modules
const path = require("path");
const fs = require('fs');

// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodb_session = require('connect-mongodb-session');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require("morgan");

// Local Module
const { hostRouter } = require("./routers/hostRouter");
const { authRouter } = require("./routers/authRouter");
const storeRouter = require("./routers/storeRouter");
const rootDir = require("./util/path-util");
const errorController = require("./controllers/errorController");

const MongoDbStore = mongodb_session(session);
const MONGO_DB_URL =
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@hasan.pk5nyzr.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

const sessionStore = new MongoDbStore({
  uri: MONGO_DB_URL,
  collection: 'sessions',
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, 'uploads/');
  },
  filename: (req, file, cb) =>{
  cb(null, Date.now() + '-' + file.originalname);
  },
});

// Optional: filter files by type (e.g., images only)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const loggingPath = path.join(rootDir, 'access.log');
const accessLogStream = fs.createWriteStream(loggingPath, {flags: 'a'})

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use('/uploads',express.static(path.join(rootDir, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage, fileFilter }).single('photo'));
app.use(
  session({
    secret: "MERN LIVE BATCH",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use("/host", hostRouter);
app.use(authRouter);

app.use(errorController.get404);

const PORT = process.env.PORT ||3047;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});

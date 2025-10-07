const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();

// mongo connection
const connectMongo = require("./config/connect");

// middleware
const { checkForAuthentication, restrictTo } = require("./middlewares/auth"); 
const { logRequestPath } = require("./middlewares/utils"); 

// routers
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const staticRoute = require("./routes/staticRouter");
const { default: flashMiddleware } = require("./middlewares/flash");

const app = express();
const PORT = 8001;

// mongo connection
connectMongo(process.env.MONGO_URI).then(() =>
  console.log("Mongodb Connected")
);

// set templating engine to ejs
app.set("view engine", "ejs");
// set views folder in scope
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication); // to set req.user
app.use(logRequestPath); // to log path

// for toast on redirect
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flashMiddleware);

// for static files
app.use(express.static(path.join(__dirname, "public")));

// app.use() adds application level middleware to instance of app object
// ------ routes --------->
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/url", restrictTo(["user"]), urlRoute);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

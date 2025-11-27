const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// mongo connection
const { connectMongo, sessionMiddleware } = require("./config/connect");

const config = require("./config/config");

// middleware
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const { logRequestPath } = require("./middlewares/utils");
const { flashMiddleware } = require("./middlewares/flash");
const { mongoSanitize } = require("./middlewares/sanitize");
const { limiter } = require("./middlewares/rate-limiter");

// routers
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = config.port || 8001;

// mongo connection
connectMongo();

// set templating engine to ejs
app.set("view engine", "ejs");
// set views folder in scope
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize); // mongdb injection prevention
app.use(sessionMiddleware); // session for flash
app.use(limiter); // rate limiter
app.use(checkForAuthentication); // check for authenticated user
app.use(logRequestPath); // log path
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
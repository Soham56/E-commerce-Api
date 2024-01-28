require("dotenv").config();
require("express-async-errors");

// express intialising
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// other modules
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// connect to the database function
const connectDb = require("./db/connectDb");

// loading all required middlewares
const routeNotFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// requiring all routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/v1/", (req, res) => {
    console.log(req.signedCookies);
    res.send("checking");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on PORT ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

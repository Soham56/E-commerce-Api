require("dotenv").config();
require("express-async-errors");

// express intialising
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// other modules
const morgan = require("morgan");

// connect to the database function
const connectDb = require("./db/connectDb");

// loading all required middlewares
const routeNotFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// requiring all routes
const authRoutes = require("./routes/authRoutes");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/v1/auth", authRoutes);

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

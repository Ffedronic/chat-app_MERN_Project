const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB connection successfull"))
.catch((error) => console.log(error.message));

app.use("/api/auth", userRouter) ;

module.exports = app ;
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

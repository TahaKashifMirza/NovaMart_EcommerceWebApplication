require("dotenv").config();

const express = require("express");

const app = express();

const cors = require("cors");

const authRouter = require ("./router/auth-router"); //Router Path

const contactRouter = require ("./router/contact-router"); //Router Path

const paymentRouter = require('./router/payment-router');

const connectDb = require("./utils/db"); // Database Path

const errorMiddleware = require("./middlewares/error-middleware"); // Error Middleware Path

app.use(express.json()); //Express Middleware

// Cors Configuration
const corsOptions = {
     origin: "http://localhost:5173",
     methods:"GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS" ,
     Credential: true,
   }
  // Cors Middleware
  app.use(cors(corsOptions));

app.use("/api/auth", authRouter); 

app.use("/api/form", contactRouter);

app.use('/api/payment', paymentRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001; //define Port Number

connectDb().then( () => {
app.listen(PORT, () => {
  console.log(`Server is listen on Port: ${PORT}`);
  console.log(`http://localhost:${PORT}/api/auth`);
})
});

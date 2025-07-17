const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();
const {dbConnect} = require("./config/database");
const homeFormRoute = require("./routes/homeFormRoute");

//Middleware
app.use(express.json());

//Database Calling
dbConnect();

//Mounting
app.use("/api/v1",homeFormRoute);

//Home route
app.get("/", (req, res) =>{
    res.send(`<h1>Hello from the server ! </h1>`);
})

app.listen(PORT, (req, res) => {
    console.log(`Sever is running at port ${PORT}`);
})
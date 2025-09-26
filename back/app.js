require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const routers = require('./controllers/register');
app.use(cors());
//const routers = require('./controllers/register');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://127.0.0.1:27017/aagaaram").then(()=>{
    console.log("DB connected successfully");
}).catch((error)=>{
  console.log("OOPS error",error);
})



app.use("/api",routers);

const PORT=3000;
app.listen(PORT, async()=>{
    console.log("Server is started on port ",PORT);
});

// const cors = require('cors');
// const express = require('express');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api', require('./controllers/register')); // Assuming your routes are under '/api'

// app.listen(3000, '0.0.0.0', () => {
//   console.log('Server running on port 3000');
// });

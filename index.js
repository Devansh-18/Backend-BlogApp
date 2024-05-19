const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());//middleware

const blog = require("./routes/blog");
app.use("/api/v1",blog);//mount

const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT, ()=>{
    console.log(`App is running at Port No. ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is Home Page</h1>`)
})
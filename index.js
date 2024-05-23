const express = require("express");
const cors = require("cors");
require("dotenv").config();
const blog = require("./routes/blog");
const connectWithDb = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());//middleware
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/api/v1",blog);//mount

connectWithDb();

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });
// app.use((req, res, next) => {
//     // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

// app.use(cors({
    
//         "origin": "*",
//         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//         "preflightContinue": false,
//         "optionsSuccessStatus": 204,
      
//     header:"Access-Control-Allow-Origin",
//     // origin: 'http://localhost:5173', // use your actual domain name (or localhost), using * is not recommended
    
//     // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: ["Access-Control-Allow-Origin", 'Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     credentials: true
// }))

// const corsOptions = {
//   origin: "http://localhost:5173",
// };

// app.use(cors(corsOptions));

// app.use(cors());

app.listen(PORT, ()=>{
    console.log(`App is running at Port No. ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is Home Page</h1>`)
})
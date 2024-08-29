const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
var delay = require('express-delay');
require('dotenv').config()

const app = express();

//Connecting to MONGODB (Locally)
mongoose.connect(process.env.MONGO_PROD_CONN,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('DB IS CONNECTED')
})

//Importing route
// const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const facultyRoutes = require("./routes/faculty")
const studentRoutes = require("./routes/student")

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(delay(500));



// app.use("/api",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/faculty",facultyRoutes)
app.use("/api/student",studentRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        success : false,
        response : "No Route exist!"
    })
  })


// Port 
const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log('SERVER IS RUNNING AT',port)
})
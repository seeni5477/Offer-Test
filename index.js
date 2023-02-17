const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const route = require("./routes/router");

const port = process.env.PORT || 8000
//  console.log("process.env ", process.env);

dotenv.config();
console.log("process.env.MONGO_URL ", process.env.MONGO_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connection successful');
    }).catch((err) => {
        console.log(err);
    })

app.use(cors())
app.use(express.json())

app.use("/api/v1", route);

app.listen(port, () => {
    console.log('Server is running at 8000');
})
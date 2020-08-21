require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
        process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
    .catch(err => console.error(err))

mongoose.connection.on('error', err => {
    console.log("DB ERROR MESSAGE :", err.message);
});

mongoose.connection.once('open', () => {
    console.log("'successfully' connected with Database!")
});
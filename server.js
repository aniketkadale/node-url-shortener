require('dotenv').config();
const express = require('express')
const app = express();
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./db')
const PORT = process.env.PORT;

connectToMongoDB(`${process.env.MONGO_URL}`).then(() => console.log("MongoDB connected..."));

app.use(express.json());
app.use('/url', urlRoute);


app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
})
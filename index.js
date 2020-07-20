const express = require('express');
const userRoute = require('./Route/userRoute');
const router = express.Router();

const app = express();

app.use(express.json());

app.use('/api/users',userRoute);

app.listen(8000, () => {
    console.log('Server is Running');
});
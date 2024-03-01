import express from 'express';
import dotenv from 'dotenv'
import connectDb from './Config/db.js';
import cookieParser from 'cookie-parser';
dotenv. config();

//connecting to database
connectDb();

import userRoutes from './Routes/user-routes.js'

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());



const port = process.env.PORT;
app.use ('/api/users', userRoutes);

app.listen( port, () => console.log(`server is running on port ${port}`));

app.get('/', function (req,res) {
    res.send ('Hello from the server')
});
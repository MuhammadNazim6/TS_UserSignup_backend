import express, { Request, Response, NextFunction } from 'express';
import session, { SessionData } from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/userRoute';

const app = express();
dotenv.config({ path: ".env" });
mongoose.connect(process.env.MONGO_DB+'TS');
const PORT = process.env.PORT;


app.use(
  session({
    secret: 'mycodedcodecode',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(userRoute)

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);



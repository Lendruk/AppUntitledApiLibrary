import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './utils/database';
import { ErrorManager, errors } from './utils/errors';
import { RouteAggregator } from './controllers';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect DB
dbConnection().then(() => console.log("Database Connected..."));

const mainRouter = new RouteAggregator(app);

//Not Found Handler
app.use((req, res, next) => next(errors.NOT_FOUND));

//Error Handler
app.use(ErrorManager.handleError)


app.listen(3002, () => console.log("Server Listening on port 3000 "));

export { mainRouter };
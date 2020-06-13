import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './utils/database';
import { ErrorManager, errors } from './utils/errors';
import { RouteAggregator } from './lib/classes/RouteAggregator';
import dotenv from 'dotenv';
import { Injector } from './lib/classes/Injector';
import { cloudinaryConfig } from './utils/cloudinary';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect DB
dbConnection().then(() => console.log("Database Connected..."));

// Setup Cloudinary Config
app.use('*', cloudinaryConfig);

// Initialize the dependecy injection 
new Injector();

// Aggregate all the controllers
new RouteAggregator(app, true);

//Not Found Handler
app.use((req, res, next) => next(errors.NOT_FOUND));

//Error Handler
app.use(ErrorManager.handleError)


app.listen(4000, () => console.log("Server Listening on port 4000 "));
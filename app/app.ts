import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import connectToDb from "./utils/database";
import { ErrorManager, errors } from "./utils/errors";
import App from "./lib/classes/App";

const app = new App().app;

// Connect DB
connectToDb().then(() => console.log("Database Connected..."));

//Not Found Handler
app.use((req, res, next) => {
    console.log("request", req.get("Host")?.concat(" " + req.url));
    next(errors.NOT_FOUND);
});

//Error Handler
app.use(ErrorManager.handleError);

import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import connectToDb from "./utils/database";
import { ErrorManager } from "./utils/ErrorManager";
import App from "./lib/classes/App";
import { PermissionChecker } from "./middleware/PermissionChecker";

const plugins = [PermissionChecker.verifyPermission];

const app = new App({ debug: true, plugins }).app;

// Connect DB
connectToDb().then(() => console.log("Database Connected..."));

//Not Found Handler
app.use((req, res, next) => {
    console.log("request", req.get("Host")?.concat(" " + req.url));
    next(ErrorManager.errors.NOT_FOUND);
});

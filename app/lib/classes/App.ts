import express, { NextFunction } from "express";
import "reflect-metadata";
import e from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Injector } from "./Injector";
import { ControllerExtractor } from "./ControllerExtractor";
import { RouteAggregator } from "./RouteAggregator";
import { SocketServer } from "./SocketServer";
import { ErrorManager } from "./ErrorManager";
import { MiddyFunction } from "../decorators/routeType";
import { Request } from "../types/Request";
import { Response } from "../types/Response";

export default class App {
    app: e.Express;

    constructor(options?: {
        plugins?: Array<MiddyFunction>;
        errorHandler?: (errorFormat: any, req: Request, res: Response, next: NextFunction) => void;
        debug?: boolean;
        errorType?: {};
    }) {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.engine("munch", (filePath, options, callback) => {
            return callback(null, "");
        });
        this.app.set("view engine", "munch");
        if (options?.plugins) this.applyPlugins(options?.plugins);

        // Initialize the dependecy injection
        const injector = new Injector();

        // Create the server
        const httpServer = http.createServer(this.app);

        const controllerExtractor = new ControllerExtractor();

        // Aggregate all the controllers
        const aggregator = new RouteAggregator(this.app, options?.debug);
        controllerExtractor.addTask(aggregator.aggregateRoutes);

        injector.registerService(SocketServer, httpServer);
        const socketServer = Injector.instance.retrieveService(SocketServer)?.service as SocketServer;

        controllerExtractor.addTask(socketServer.registerSockets);

        controllerExtractor.executeTasks();

        //Error Handler
        this.app.use(options?.errorHandler ? options.errorHandler : ErrorManager.handleError);

        httpServer.listen(4000);
        console.log("server listening on port 4000");
    }

    private applyPlugins(plugins: Array<MiddyFunction>): void {
        for (const plugin of plugins) {
            this.app.use(plugin);
        }
    }
}

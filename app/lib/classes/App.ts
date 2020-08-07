import express from "express";
import "reflect-metadata";
import e from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Injector } from "./Injector";
import { ControllerExtractor } from "./ControllerExtractor";
import { RouteAggregator } from "./RouteAggregator";
import { SocketServer } from "./SocketServer";

export default class App {
    app: e.Express;
    constructor() {
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Initialize the dependecy injection
        const injector = new Injector();

        // Create the server
        const httpServer = http.createServer(this.app);

        const controllerExtractor = new ControllerExtractor();

        // Aggregate all the controllers
        const aggregator = new RouteAggregator(this.app, true);
        controllerExtractor.addTask(aggregator.aggregateRoutes);

        // const http = app.listen(4000, () => console.log("Server Listening on port 4000 "));

        injector.registerService(SocketServer, httpServer);
        const socketServer = Injector.instance.retrieveService(SocketServer)?.service as SocketServer;

        controllerExtractor.addTask(socketServer.registerSockets);

        controllerExtractor.executeTasks();

        httpServer.listen(4000);
        console.log("server listening on port 4000");
    }
}

import io, { Server, Socket } from "socket.io";
import e from "express";
import http from "http";
import { Constructable } from "../interfaces/Constructable";
import { BaseController } from "./BaseController";

export class SocketServer {
    socketServer: Server;

    constructor(httpServer: http.Server) {
        this.socketServer = io(httpServer);
        this.registerSockets = this.registerSockets.bind(this);
    }

    registerSockets(controllers: Array<Constructable<BaseController>>) {
        let socketEvents: Array<EventType> = [];
        for (const controller of controllers) {
            if (Reflect.hasMetadata("socketEvents", controller)) {
                const events = Reflect.getMetadata("socketEvents", controller) as Array<EventType>;
                socketEvents = socketEvents.concat(events);
            }
        }
        this.socketServer.on("connection", (socket) => {
            console.log("user has connected");

            for (const event of socketEvents) {
                socket.on(event.eventName, (data) => event.method(this.socketServer, socket, data));
            }
        });
    }
}

export const SocketEvent = (eventName: string): MethodDecorator => {
    return (target, propertyKey: string | symbol): void => {
        if (!Reflect.hasMetadata("socketEvents", target.constructor)) {
            Reflect.defineMetadata("socketEvents", [], target.constructor);
        }

        const events = Reflect.getMetadata("socketEvents", target.constructor) as Array<EventType>;

        events.push({
            eventName,
            method: target.constructor.prototype[propertyKey],
        });
    };
};

type EventType = {
    eventName: string;
    method: (SocketServer: Server, socket: Socket, data?: any) => void;
};

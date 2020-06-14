import io, { Server } from 'socket.io';
import e from 'express';
import http from 'http';
import { Constructable } from '../interfaces/Constructable';
import { BaseController } from './BaseController';
import { Injectable } from '../decorators/Injectable';

@Injectable()
export class SocketServer {

    listeners : Array<string>;

    socketServer : Server; 

    constructor(app : e.Express) { 
        const httpServer = http.createServer(app);
        this.socketServer = io(httpServer, { path: "socket"});
        this.listeners = new Array();

        this.registerSockets = this.registerSockets.bind(this);

        this.socketServer.on("connection", socket => {
            console.log("user has connected");
        });
    }

    registerSockets(controllers : Array<Constructable<BaseController>>) {
        for(const controller of controllers) {

        }
    }
}


export const SocketEvent = (eventName: string) : MethodDecorator => {
    return (target, propertyKey : string | symbol) : void => {

    }
}
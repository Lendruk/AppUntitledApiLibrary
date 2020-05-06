import express, { Request, Response } from 'express';
import e from 'express';
import fs from 'fs';
// Import Controllers
import { RouteType } from '../lib/decorators/routeType';
import { BaseController } from './BaseController';

export class RouteAggregator {
    private router : e.Router;
    private app : e.Express;

    constructor(app : e.Express) {
        this.router = express.Router();
        this.app = app;
        
        const files = fs.readdirSync(`${__dirname}`);
        this.extractControllers(files).forEach(controller => {
            if(typeof controller === 'function') {
                const instance = new controller();
    
                // This is the route prefix ex. "/users"
                const prefix = Reflect.getMetadata("prefix", controller);
    
                const routes : Array<RouteType> = Reflect.getMetadata("routes", controller);
    
                for(const route of routes) {
                    this.app[route.requestMethod]((process.env.API_URL || "/api") + prefix + route.path, (req : Request, res : Response ) => {
                        let result = instance[route.methodName as string](req, res);
                        
                        if(result instanceof Promise) {
                            result.then(promiseValues => this.formatResponse(promiseValues, res));
                        } else {
                            this.formatResponse(result, res);
                        }
                    });
                }
            }
        });
        
    }

    private formatResponse(data : any, res : Response)  {
        let status = 200;
        let results : { [key: string]: any[] } = {};

        for(const key in data) {
            if(key === "code") {
                status = data[key];
            } else {
                results[key] = data[key];
            }
        }

        res.status(status).json(results)
    }

    private extractControllers(files : string[]) : any[]{
        const controllers : BaseController[] = [];
        for(const file of files) {
            if(!file.includes('index') && !file.includes('BaseController')) {
                const controller = require(`./${file}`);
                controllers.push(Object.values(controller)[0] as BaseController);
            }
        }
        return controllers;
    }

    getRouter() : e.Router {
        return this.router;
    }
}
import e from "express";

export class Injector {
    static instance: Injector;
    private serviceMap: Map<any, Array<any>>;
    private expressApp : e.Express;

    constructor(app : e.Express) {
        this.serviceMap = new Map();
        this.expressApp = app;

        // If the singleton hasn't been created yet
        // assign it
        if (!Injector.instance) {
            Injector.instance = this;
        }
    }

    private hasService(service: any): boolean {
        const keys = this.serviceMap.keys();
        let key = keys.next();
        while (!key.done) {
            if (key.value instanceof service)
                return true;
            key = keys.next();
        }
        return false;
    }

    private retrieveService(service: any) {
        const keys = this.serviceMap.keys();
        let key = keys.next();
        while (!key.done) {
            if (key.value instanceof service)
                return { service: key.value, consumers: this.serviceMap.get(key.value) };
            key = keys.next();
        }

        return null;
    }

    registerService(service: any) {
        if (!this.hasService(service)) {
            this.serviceMap.set(new service(this.expressApp), new Array<any>());
        }
    }

    registerConsumer(service: any, consumer: any) {
        if (!this.hasService(service)) {
            this.registerService(service);
        }
        const servicePair = this.retrieveService(service);
        const consumers = servicePair?.consumers;
        consumers?.push(consumer);
        this.serviceMap.set(service, consumers || new Array<any>());

        return servicePair?.service;
    }

    injectService(service: any) {
        if (this.serviceMap.has(service)) {

        }
    }

}
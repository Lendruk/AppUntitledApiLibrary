import e from "express";
import fs from 'fs';
import express, { Response, NextFunction } from 'express';
import { BaseController } from "./BaseController";
import { Constructable } from "../interfaces/Constructable";

export class ControllerExtractor {
    private tasks: Array<(controllers:  Array<Constructable<BaseController>>) => any>;

    constructor() {
        this.tasks = new Array();
    }

    addTask(task : (controllers:  Array<Constructable<BaseController>>) => any) {
        this.tasks.push(task);
    }

    executeTasks() {
        const files = fs.readdirSync(`${__dirname}/../../controllers`);
        const controllers = this.extractControllers(files);
        for(const task of this.tasks) {
            task(controllers);
        }
    }

    private extractControllers(files: string[]): Array<Constructable<BaseController>> {
        const controllers: Array<Constructable<BaseController>> = new Array();
        for (const file of files) {
            if (!file.includes('index') && !file.includes('BaseController')) {
                const controller = require(`../../controllers/${file}`);
                controllers.push(Object.values(controller)[0] as Constructable<BaseController>);
            }
        }
        return controllers;
    }
}
import { ModelProperty } from '../types/modelProperty';
import { mongoose } from '../../utils/database';
import { Model as MongooseModel } from 'mongoose';
import { errors } from '../../utils/errors';

export const Model = () : ClassDecorator => {
    return (target : any) => {
        if(typeof target === "function") {
            if(!Reflect.hasMetadata("properties", target)) {
                Reflect.defineMetadata("properties", [], target);
            }

        }
    }
}

export const Property = (modelProperty : ModelProperty) : PropertyDecorator => {
    return (target : any, propertyKey : String | Symbol) => {
        if (!Reflect.hasMetadata("properties", target.constructor)) {
            Reflect.defineMetadata("properties", [], target.constructor);
        }

        const properties = Reflect.getMetadata("properties", target.constructor);
        properties.push({
            ...modelProperty,
            propertyKey,
            type: Reflect.getMetadata("design:type", target, propertyKey as string),
        });
    }
}

export const getModelFromClass = <T extends mongoose.Document>(target : Function) : MongooseModel<T> => {
    if(!Reflect.hasMetadata("properties", target)) {
        Reflect.defineMetadata("properties", [], target);
    }

    const schemaProperties : {[index : string ] : any} = {};
    for(const property of Reflect.getMetadata("properties", target)) {
        const key = property.propertyKey;
        delete property.propertyKey;
        schemaProperties[key] = { ...property, type: property.type.name !== 'Array' ? property.type : [property.type] };
    }

    console.log("props", schemaProperties);

    const schema = new mongoose.Schema({

    }, { timestamps: { createdAt: '_created', updatedAt: '_modified' } } );

    return mongoose.model<T>(target.name.replace(/(Model)+/g, ""), schema);
}


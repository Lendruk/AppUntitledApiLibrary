import { PropertyOptions } from '../types/PropertyOptions';
import { mongoose } from '../../utils/database';
import { Model as MongooseModel } from 'mongoose';
import { errors } from '../../utils/errors';
import { ModelProperties } from '../types/ModelProperties';

export const ModelOptions = (modelProperties : ModelProperties ) : ClassDecorator => {
    return (target : any) => {
        if(typeof target === "function") {
            if(!Reflect.hasMetadata("properties", target)) {
                Reflect.defineMetadata("properties", [], target);
            }

            Reflect.defineMetadata("ModelOptions", modelProperties ,target);
        }
    }
}

export const Property = (modelProperty : PropertyOptions) : PropertyDecorator => {
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

    const schema = new mongoose.Schema({

    }, { timestamps: { createdAt: '_created', updatedAt: '_modified' } } );

    if(Reflect.hasMetadata("ModelOptions", target)) {
        const modelOptions = Reflect.getMetadata("ModelOptions", target) as ModelProperties;

        if(modelOptions.expireAfter) {
            schema.index({ _created: 1 }, { expireAfterSeconds: modelOptions.expireAfter.getSeconds() });
        }
    }

    return mongoose.model<T>(target.name.replace(/(Model)+/g, ""), schema);
}


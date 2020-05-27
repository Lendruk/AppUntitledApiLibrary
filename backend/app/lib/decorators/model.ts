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

// Refactor this completely
export const getModelFromClass = <T extends mongoose.Document>(target : Function) : MongooseModel<T> => {
    if(!Reflect.hasMetadata("properties", target)) {
        Reflect.defineMetadata("properties", [], target);
    }
    const schemaProperties : { [index : string ] : any} = {};
    for(const property of Reflect.getMetadata("properties", target)) {
        const key = property.propertyKey;
        delete property.propertyKey;

        if(property.items) {
            schemaProperties[key] = extractArray(property.items);
        } else {
            schemaProperties[key] = { ...property,
            type: extractType(property.type) };
        }
    }
    const schema = new mongoose.Schema({
        ...schemaProperties
    }, { timestamps: { createdAt: '_created', updatedAt: '_modified' } } );

    // Add Functions
    for(const protoKey of Object.getOwnPropertyNames(target.prototype)) {
        if(protoKey !== 'constructor') {
            const protoFunction = target.prototype[protoKey];
            schema.methods[protoKey] = protoFunction;
        }
    }

    if(Reflect.hasMetadata("ModelOptions", target)) {
        const modelOptions = Reflect.getMetadata("ModelOptions", target) as ModelProperties;

        if(modelOptions.expireAfter) {
            schema.index({ _created: 1 }, { expireAfterSeconds: modelOptions.expireAfter.getSeconds() });
        }
    }
    return mongoose.model<T>(target.name.replace(/(Model)+/g, ""), schema);
}

// Refactor this completely
const BASE_TYPES = ["String", "Number", "Date", "Boolean", "Array", "ObjectId"];
function extractType(type : Function) : any {
    if(!type) return {};
    if(BASE_TYPES.includes(type.name)) {
        return type;
    } else {
        let builtType = {};
        if(Reflect.hasMetadata("properties", type)) {
            for(const prop of Reflect.getMetadata("properties", type)) {
                const key = prop.propertyKey;
                delete prop.propertyKey;
                if(BASE_TYPES.includes(prop.type.name)) {
                    builtType = { ...builtType, [key]: { ...prop,  type: extractType(prop.type) } };
                } else {
                    builtType = { ...builtType, [key]: { ...prop,  ...extractType(prop.type) } };
                }

            }
        }
        return builtType;
    }
}

function extractArray(type: any) {
    if(Reflect.hasMetadata("properties", type)) {
        let builtType = {};
        for(const prop of Reflect.getMetadata("properties", type)) {
            const key = prop.propertyKey;
            const propType = extractType(prop.type);
            delete prop.propertyKey;
            if(!BASE_TYPES.includes(prop.type.name)) delete prop.type;
            builtType = { ...builtType, [key]: { ...prop, ...propType }};
        }
        return [{...builtType}];
    }
    return [type.schema];
}



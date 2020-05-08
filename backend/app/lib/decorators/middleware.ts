import { MiddyPair, MiddyFunctions } from './RouteType';

export const Middleware = (...middlewares : MiddyFunctions) : MethodDecorator => {
    return (target : any, propertyKey : string | symbol) => {
        if(!Reflect.hasMetadata("middleware", target.constructor)) {
            Reflect.defineMetadata("middleware", new Array<MiddyPair>(), target.constructor);
        }

        const methodsMiddlewares = Reflect.getMetadata("middleware", target.constructor) as Array<MiddyPair>;
        methodsMiddlewares.push({ method: propertyKey, functions: middlewares });

    };
}
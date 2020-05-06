import { RouteType } from "./routeType";

export const MethodHandler = (method : "get" | "put" | "post" | "patch" | "delete") => {
 return (path : string) : MethodDecorator => {
    // target = class
    // propertyKey = decorated Method
    return (target, propertyKey : string | symbol) : void => {

        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }

        const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteType>;

        routes.push({
            requestMethod: method,
            path,
            methodName: propertyKey,
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
        }
    }
}
    
export interface RouteType {
    path : string;

    requestMethod: "get" | "post" | "put" | "patch" | "delete";

    methodName : string | symbol;
}
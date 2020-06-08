import { RouteType } from "./RouteType";
import { MethodHandler } from "./methodHandler";

export const Get = MethodHandler("get");
export const Post = MethodHandler("post");
export const Put = MethodHandler("put");
export const Patch = MethodHandler("patch");
export const Delete = MethodHandler("delete");
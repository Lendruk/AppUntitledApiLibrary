import { RouteType } from "./RouteType";
import { MethodHandler } from "./MethodHandler";

export const Get = MethodHandler("get");
export const Post = MethodHandler("post");
export const Put = MethodHandler("put");
export const Patch = MethodHandler("patch");
export const Delete = MethodHandler("delete");
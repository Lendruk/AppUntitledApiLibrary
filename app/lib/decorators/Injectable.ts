import { Injector } from "../classes/Injector";

export const Injectable = (): ClassDecorator => {
    return (target: any) => {
        Injector.instance.registerService(target);
    };
};

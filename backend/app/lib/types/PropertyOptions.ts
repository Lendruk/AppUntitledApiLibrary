export type PropertyOptions = {
    required? : boolean;
    default? : any;
    ref? : string;
    min? : number;
    max? : number;
    items? : Function;

    //Quick fix move this
    type?: Function;
};
export type RouteOptions = {
    [index: string ]: any;

    body?: { required: Array<String> },
    params?: { required: Array<String> },
    headers?: { required: Array<String> },

    requireToken?: boolean,
}
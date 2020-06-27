// Endpoints

export const uriLogin = `auth/login`;
export const uriLogout = `auth/logout`
export const uriRegisterUser = `users/register`
export const uriProjects = id => `projects/${id || ""}`;
export const uriWorkspaces = id => `workspaces/${id || ""}`;
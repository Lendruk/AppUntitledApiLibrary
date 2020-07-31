// Endpoints

export const uriLogin = `auth/login`;
export const uriLogout = `auth/logout`
export const uriRegisterUser = `users/register`
export const uriProjects = id => `projects/${id || ""}`;
export const uriWorkspaces = id => `workspaces/${id || ""}`;
export const uriColumns = id => `projects/columns/${id || ""}`;
export const uriCreateTasks = projectId => `tasks/project/${projectId}`;
export const uriTasks = id => `tasks/${id || ""}`;
export const uriTags = projectId => `projects/${projectId || ""}/tags`;
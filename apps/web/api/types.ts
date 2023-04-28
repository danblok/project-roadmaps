import { Project } from "database";

export type AddProjectInput = Pick<Project, 'name' | 'description' | 'ownerId'>
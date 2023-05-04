import { Project, Account } from "database";

export type AddProjectInput = Pick<Project, 'name' | 'description' | 'ownerId'>
export type UpdateAccountInput = Pick<Account, 'name'>
export type UpdateProjectInput = Pick<Project, 'id'> & Partial<Pick<Project, 'description' | 'name'>>
export type AddRemoveContributorInput = { projectId: string, contributorId: string }
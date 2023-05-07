import { Project, Account, Task, Status } from 'database'

export type AddProjectInput = Pick<Project, 'name' | 'description' | 'ownerId'>
export type UpdateAccountInput = Pick<Account, 'name'>
export type UpdateProjectInput = Pick<Project, 'id'> &
  Partial<Pick<Project, 'description' | 'name'>>
export type AddRemoveContributorInput = {
  projectId: string
  contributorId: string
}
export type AddTaskInput = Pick<Task, 'name' | 'statusId' | 'until' | 'from'> &
  Partial<Pick<Task, 'comments'>>
export type UpdateTaskInput = Pick<Task, 'id'> &
  Partial<Pick<Task, 'name' | 'comments' | 'statusId' | 'from' | 'until'>>
export type AddStatusInput = Pick<Status, 'name'>

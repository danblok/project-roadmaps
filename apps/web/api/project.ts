import { Project, Account, Status, Task } from 'database'
import { AddProjectInput, UpdateProjectInput } from './types'
import axios from 'axios'

export const getProject = async (
  id?: string
): Promise<
  | (Project & {
      contributors: Account[]
      owner: Account
      tasks: (Task & {
        status: Status
      })[]
    })
  | null
> => {
  return axios.get(`/api/project/${id}`).then(({ data: { data } }) => data)
}

export const addProject = async (project: AddProjectInput) => {
  return axios.post(`/api/projects/`, project)
}

export const getProjects = async (
  accountId: string
): Promise<
  (Project & {
    contributors: Account[]
  })[]
> => {
  return axios
    .get(`/api/projects?accountId=${accountId}`)
    .then(({ data: { data } }) => data)
}

export const updateProject = async (project: UpdateProjectInput) => {
  const { id, ...payload } = project
  return axios.patch(`/api/project/${id}`, payload)
}

export const deleteProject = async (id: string) => {
  return axios.delete(`/api/project/${id}`)
}

export const addContributor = async (
  projectId: string,
  contributorId: string
) => {
  return axios.patch(`/api/project/${projectId}?contributorId=${contributorId}`)
}

export const removeContributor = async (
  projectId: string,
  contributorId: string
) => {
  return axios.delete(
    `/api/project/${projectId}?contributorId=${contributorId}`
  )
}

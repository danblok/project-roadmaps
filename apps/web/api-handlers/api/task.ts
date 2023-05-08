import axios from 'axios'
import { AddTaskInput, UpdateTaskInput } from './types'

export const updateTask = async (task: UpdateTaskInput) => {
  const { id, ...payload } = task
  return axios.patch(`/api/task/${id}`, payload)
}

export const addTask = async (projectId: string, payload: AddTaskInput) => {
  return axios.post(`/api/tasks?projectId=${projectId}`, payload)
}

export const deleteTask = async (id: string) => {
  return axios.delete(`/api/task/${id}`)
}

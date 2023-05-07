import axios from 'axios'
import { AddStatusInput } from './types'

export const addStatus = async (projectId: string, payload: AddStatusInput) => {
  return axios.post(`/api/statuses?projectId=${projectId}`, payload)
}

export const deleteStatus = async (id: string) => {
  return axios.delete(`/api/status/${id}`)
}

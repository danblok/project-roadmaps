import axios from 'axios'
import { Prisma, Account } from 'database'
import { UpdateAccountInput } from './types'

export const getProfile = async (
  id: string
): Promise<
  | (Account & {
      ownedProjects: {
        _count: Prisma.ProjectCountOutputType
      }[]
      projects: {
        _count: Prisma.ProjectCountOutputType
      }[]
    })
  | null
> => {
  return axios.get(`/api/profile/${id}`).then(({ data: { data } }) => data)
}

export const updateProfile = async (
  id: string,
  account: UpdateAccountInput
) => {
  return axios.post(`/api/profile/${id}`, account)
}

export const deleteProfile = async (id: string) => {
  return axios.delete(`/api/profile/${id}`)
}

export const getProfiles = async (filter: string): Promise<Account[]> => {
  return axios
    .get(`/api/profiles?filter=${filter}`)
    .then(({ data: { data } }) => data)
}

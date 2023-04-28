import axios from "axios"
import { User } from "database"

export const getProfile = async (id: string): Promise<User | null> => {
  return axios.get(`/api/profile/${id}`)
    .then(({ data }: { data: User }) => data)
}

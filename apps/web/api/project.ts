import { Project } from "database";
import { AddProjectInput } from "./types";
import axios from "axios";

export const getProject = async (id: string): Promise<Project | null> => {
  return axios.get(`/api/project/${id}`)
    .then(({ data }: { data: Project }) => data)
}

export const addProject = async (project: AddProjectInput) => {
  return axios.post(`/api/projects/`, project)
}



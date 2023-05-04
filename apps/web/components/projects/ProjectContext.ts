import { createContext, useContext } from "react";
import { Account, Project, Status, Task } from 'database';

type ContextValue = {
  project: Project & {
    contributors: Account[]
    owner: Account
    statuses: Status[]
    tasks: Task[]
  }, isProjectLoading: boolean
}

export const ProjectContext = createContext<ContextValue>((null as unknown) as ContextValue)

export default function useProjectContext() {
  const context = useContext(ProjectContext)
  return context
}


import { createContext, useContext } from 'react'
import { getProject } from '@/api-handlers/api/project'

type ContextValue = {
  project: NonNullable<Awaited<ReturnType<typeof getProject>>>
  isProjectLoading: boolean
}

export const ProjectContext = createContext<ContextValue>(
  null as unknown as ContextValue
)

export default function useProjectContext() {
  const context = useContext(ProjectContext)
  return context
}

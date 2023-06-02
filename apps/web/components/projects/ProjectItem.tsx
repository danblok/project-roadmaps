import { Project, Account } from 'database'
import { trimText } from '@/utils/text-transform'
import Link from 'next/link'
import { memo, PropsWithoutRef } from 'react'

type ProjectItemProps = {
  project: Project & {
    contributors: Account[]
  }
}
export default memo(ProjectItem)

export function ProjectItem({ project }: PropsWithoutRef<ProjectItemProps>) {
  return (
    <Link
      href="/projects/[id]"
      as={`/projects/${project.id}`}
      className="bg-slate-50 rounded-xl p-4 shadow-lg lg:p-6 xl:p-8 hover:bg-white  hover:shadow-2xl transition-all h-52"
    >
      <div className="flex flex-col justify-between h-full">
        <p className="text-lg font-bold text-cornflower-blue">{project.name}</p>
        <p className="mt-4 text-gray-500">
          {project.description !== ''
            ? trimText(project.description, 70)
            : 'No description'}
        </p>
        <p className="mt-4 text-gray-900">
          Contributors:{' '}
          <span className="text-bittersweet">
            {project.contributors.length}
          </span>
        </p>
        <p className="mt-1 text-gray-900">
          Last update:{' '}
          <span className="text-bittersweet">
            {-(new Date().getDate() - new Date(project.updatedAt).getDate())}{' '}
            days ago
          </span>
        </p>
      </div>
    </Link>
  )
}

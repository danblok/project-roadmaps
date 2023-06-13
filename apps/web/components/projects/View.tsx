import { Title } from '../Title'
import useProjectContext from './ProjectContext'
import { getHeaders, groupTasksByStatus } from '@/utils/groupTasks'
import { Fragment } from 'react'
import clsx from 'clsx'

export default function View() {
  const { project } = useProjectContext()
  const headers = getHeaders(project.tasks)
  const groupedTasks = Array.from(groupTasksByStatus(project.tasks))

  return (
    <div>
      <Title title="Roadmap view" />
      <div className="mx-auto flex flex-col overflow-x-auto max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-full">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 p-0">
                      Status
                    </th>
                    {headers.map(([year, month]) => (
                      <th
                        key={`headers${year}${month}`}
                        scope="col"
                        className="px-2 py-2 text-center border-x"
                      >
                        {month + 1}/{year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groupedTasks.map(([status, tasks]) => (
                    <Fragment key={status}>
                      <tr className={clsx('border-t dark:border-neutral-500')}>
                        <th
                          className="whitespace-nowrap px-6 py-4 font-medium"
                          rowSpan={tasks.length + 1}
                        >
                          {status}
                        </th>
                      </tr>
                      {tasks.map((task) => {
                        return (
                          <tr key={task.id}>
                            {headers.map(([year, month]) => {
                              const fromDate = new Date(task.from)
                              const untilDate = new Date(task.until)

                              const monthsDiff =
                                untilDate.getMonth() -
                                fromDate.getMonth() +
                                (untilDate.getFullYear() -
                                  fromDate.getFullYear()) *
                                  12 +
                                1

                              return year === fromDate.getFullYear() &&
                                month === fromDate.getMonth() ? (
                                <td
                                  key={`${year}${month}${task.id}`}
                                  colSpan={monthsDiff}
                                  className="whitespace-nowrap p-1 font-medium text-white"
                                >
                                  <div className="p-2 py-3 bg-cornflower-blue rounded-md">
                                    <p>
                                      <span className="text-bittersweet font-bold bg-white rounded-md py-1 px-2 mr-2">
                                        {fromDate.getDate()}th-
                                        {untilDate.getDate()}th
                                      </span>
                                      {task.name}
                                    </p>
                                  </div>
                                </td>
                              ) : (
                                <td key={`${year}${month}${task.id}`}></td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

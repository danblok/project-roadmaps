import { Title } from '../Title'
import useProjectContext from './ProjectContext'
import groupTasks, {
  getUniqueYearAndMonthTaskHeaders,
} from '@/utils/groupTasks'
import { useMemo } from 'react'
import clsx from 'clsx'

export default function View() {
  const { project } = useProjectContext()

  const headers = getUniqueYearAndMonthTaskHeaders(project.tasks)
  const groupedTasks = useMemo(
    () => Array.from(groupTasks(project.tasks)),
    [project.tasks]
  )

  return (
    <div>
      <Title title="Roadmap view" />
      <div className="mx-auto flex flex-col overflow-x-auto max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-full">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    {headers.map(([year, month]) => (
                      <th
                        key={month + month}
                        scope="col"
                        className="px-6 py-4 text-center"
                      >
                        {year}/{month + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groupedTasks.map(([status, map], i) => (
                    <tr
                      key={status}
                      className={clsx(
                        'border-b',
                        groupedTasks.length - 1 !== i &&
                          ' dark:border-neutral-500'
                      )}
                    >
                      <th className="whitespace-nowrap px-6 py-4 font-medium">
                        {status}
                      </th>
                      {headers.map(([year, month]) => {
                        // @ts-expect-error
                        if (map.has(year) && map.get(year).has(month)) {
                          // @ts-expect-error
                          const tasks = map.get(year).get(month) ?? []
                          return (
                            <td
                              key={`${status}${year}${month}`}
                              className="whitespace-nowrap px-6 py-4 font-medium text-white"
                            >
                              {tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="py-2 px-2 bg-cornflower-blue mt-2 rounded-md"
                                >
                                  <p>
                                    <span className="text-bittersweet font-bold bg-white rounded-md py-0.5 px-1 mr-2">
                                      {new Date(task.until).getDate()}th
                                    </span>
                                    {task.name}
                                  </p>
                                </div>
                              ))}
                            </td>
                          )
                        }
                        return <td></td>
                      })}
                    </tr>
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

import { Status, Task } from 'database'

export default function groupTasks(tasks: (Task & { status: Status })[]) {
  const groupedTasks = new Map<
    string,
    Map<number, Map<number, (Task & { status: Status })[]>>
  >()

  for (const task of tasks) {
    const date = new Date(task.until)
    const year = date.getFullYear()
    const month = date.getMonth()
    const status = task.status.name

    if (groupedTasks.has(status)) {
      const groupedTasksByStatus = groupedTasks.get(status)
      // @ts-expect-error
      if (groupedTasksByStatus.has(year)) {
        // @ts-expect-error
        const groupedTasksByYear = groupedTasksByStatus.get(year)
        // @ts-expect-error
        if (groupedTasksByYear.has(month)) {
          // @ts-expect-error
          groupedTasksByYear.get(month).push(task)
        } else {
          // @ts-expect-error
          groupedTasksByYear.set(month, [task])
        }
      } else {
        // @ts-expect-error
        groupedTasksByStatus.set(year, new Map().set(month, [task]))
      }
    } else {
      groupedTasks.set(
        status,
        new Map().set(year, new Map().set(month, [task]))
      )
    }
  }

  return groupedTasks
}

export function getHeaders(
  tasks: (Task & { status: Status })[]
): [number, number][] {
  let headers: [number, number][] = new Array()

  for (const task of tasks) {
    const date = new Date(task.from)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (!headers.find((h) => h[0] === year && h[1] === month)) {
      headers.push([year, month])
    }
  }

  return headers
}

export function groupTasksByStatus(tasks: (Task & { status: Status })[]) {
  const groupedTasks = new Map<string, (Task & { status: Status })[]>()
  for (const task of tasks) {
    const status = task.status.name

    if (groupedTasks.has(status)) {
      // @ts-expect-error
      groupedTasks.get(status).push(task)
    } else {
      groupedTasks.set(status, [task])
    }
  }

  return groupedTasks
}

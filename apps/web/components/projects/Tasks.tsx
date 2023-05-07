import { useState } from 'react'
import useProjectContext from './ProjectContext'
import { TaskItem } from './TaskItem'
import { Title } from '../Title'
import { AddTaskItem } from './AddTaskItem'

export default function Tasks() {
  const { project } = useProjectContext()
  const [editableId, setEditableId] = useState('')

  return (
    <div>
      <Title title="Tasks" />
      <div className="flex flex-col p-4 gap-4">
        <h3 className="text-xl font-bold text-cornflower-blue self-center lg:self-start">
          Create a new task
        </h3>
        <AddTaskItem />
        <h3 className="text-xl font-bold text-cornflower-blue self-center lg:self-start">
          Manage your tasks
        </h3>
        {project.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editableId={editableId}
            setEditableId={setEditableId}
          />
        ))}
      </div>
    </div>
  )
}

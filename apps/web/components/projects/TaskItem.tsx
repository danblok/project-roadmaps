import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ActionButton from '../ActionButton'
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import useProjectContext from './ProjectContext'
import { UpdateTaskInput } from '@/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, updateTask } from '@/api/task'
import Loader from '../Loader'
import DatePicker from 'react-datepicker'
import { getDateRange } from '@/utils/dates'
import { Task } from 'database'
import Statuses from './Statuses'

type TaskItemProps = {
  task: Task
  editableId: string
  setEditableId: Dispatch<SetStateAction<string>>
}

type FormData = Pick<Task, 'name' | 'comments'>

export const TaskItem = ({
  task,
  editableId,
  setEditableId,
}: TaskItemProps) => {
  const queryClient = useQueryClient()
  const { project, isProjectLoading } = useProjectContext()
  const [selected, setSelected] = useState(
    project.statuses.find((s) => s.id === task.statusId)
  )

  const [startDate, setStartDate] = useState<Date | null>(new Date(task.from))
  const [endDate, setEndDate] = useState<Date | null>(new Date(task.until))

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()

  const updateMutation = useMutation({
    mutationFn: (task: UpdateTaskInput) => {
      return updateTask(task)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteTask(id)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const [from, until] = getDateRange(startDate, endDate)
    await updateMutation.mutateAsync(
      { ...data, id: task.id, statusId: selected?.id, from, until },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['project'],
          })
        },
      }
    )
  }

  const isEditable = task.id === editableId
  const mutationIsLoading = updateMutation.isLoading || deleteMutation.isLoading

  return (
    <>
      {(isProjectLoading || mutationIsLoading) && <Loader />}
      <div className="flex">
        <form
          className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-1 items-center mt-2"
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit(onSubmit)()
            setEditableId('')
          }}
        >
          <input
            {...register('name', {
              value: task.name,
              required: true,
              maxLength: 100,
            })}
            type="text"
            placeholder="Task name"
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 w-full min-w-[10rem]',
              errors.name && 'focus:border-bittersweet'
            )}
            disabled={!isEditable}
          />
          <input
            {...register('comments', { value: task.comments })}
            type="text"
            placeholder="Comments"
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 w-full min-w-[10rem]',
              errors.comments && 'focus:border-bittersweet'
            )}
            disabled={!isEditable}
          />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 w-full min-w-[14rem]'
            )}
            minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
            disabled={!isEditable}
          />
          <Statuses
            isEditable={isEditable}
            selected={selected}
            setSelected={setSelected}
          />
          {isEditable ? (
            <ActionButton type="submit" samePadding>
              <CheckIcon width={20} height={20} className="white" />
            </ActionButton>
          ) : (
            <>
              <ActionButton
                type="button"
                onClick={() => setEditableId(task.id)}
                samePadding
              >
                <PencilIcon width={20} height={20} className="white" />
              </ActionButton>
              <ActionButton
                type="button"
                onClick={async () => {
                  await deleteMutation.mutateAsync(task.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ['project'],
                      })
                    },
                  })
                }}
                samePadding
              >
                <TrashIcon width={20} height={20} className="white" />
              </ActionButton>
            </>
          )}
        </form>
      </div>
    </>
  )
}

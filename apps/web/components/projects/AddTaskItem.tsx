import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useProjectContext from './ProjectContext'
import { PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import ActionButton from '../ActionButton'
import { Task } from '@/../../packages/database/dist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '@/api/task'
import { AddTaskInput } from '@/api/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getDateRange } from '@/utils/dates'
import Loader from '../Loader'
import StatusList from './StatusList'

type AddTaskItemProps = {}
type FormData = Pick<Task, 'name' | 'comments'>

export const AddTaskItem = ({}: AddTaskItemProps) => {
  const queryClient = useQueryClient()
  const { project, isProjectLoading } = useProjectContext()

  const [selected, setSelected] = useState(
    project.statuses.find((s) => s.name === 'Ready')
  )

  console.log('mark 1')
  const now = new Date()
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().setMonth(now.getMonth() + 1))
  )
  console.log('mark 2')

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

  const mutation = useMutation({
    mutationFn: (task: AddTaskInput) => {
      return addTask(project.id, task)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const [from, until] = getDateRange(startDate, endDate)
    await mutation.mutateAsync(
      { ...data, statusId: selected!.id, from, until },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['project'],
          })
        },
      }
    )
  }
  console.log('mark 3')
  return (
    <>
      {mutation.isLoading && <Loader />}
      <div className="flex">
        <form
          className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-1 items-center mt-2"
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit(onSubmit)()
          }}
        >
          <input
            type="text"
            {...register('name', {
              required: true,
              maxLength: 100,
            })}
            placeholder="Task name"
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 w-full min-w-[10rem]',
              errors.name && 'focus:border-bittersweet',
              (isProjectLoading || mutation.isLoading) &&
                'bg-opacity-100 text-cornflower-blue'
            )}
          />
          <input
            type="text"
            {...register('comments')}
            placeholder="Comments"
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 w-full min-w-[10rem]',
              errors.comments && 'focus:border-bittersweet',
              (isProjectLoading || mutation.isLoading) &&
                'bg-opacity-100 text-cornflower-blue'
            )}
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
            minDate={new Date(new Date().setMonth(now.getMonth() - 3))}
          />
          <StatusList
            isEditable
            selected={selected}
            setSelected={setSelected}
          />
          <ActionButton type="submit" samePadding>
            <PlusIcon width={20} height={20} className="white" />
          </ActionButton>
        </form>
      </div>
    </>
  )
}

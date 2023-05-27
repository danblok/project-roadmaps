import { AddStatusInput } from '@/api-handlers/api/types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ActionButton from '../ActionButton'
import ErrorFieldMessageWrapper from '../ErrorFieldWrapper'
import FormModal from '../FormModal'
import useProjectContext from './ProjectContext'
import { addStatus } from '@/api-handlers/api/status'

type CreateStatusDialogProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type FormData = AddStatusInput

export default function CreateStatusDialog({
  isOpen,
  setIsOpen,
}: CreateStatusDialogProps) {
  const queryClient = useQueryClient()
  const {
    project: { id: projectId, statuses },
  } = useProjectContext()

  const mutation = useMutation({
    mutationFn: (status: AddStatusInput) => {
      return addStatus(projectId, status)
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!statuses.find((s) => s.name === data.name)) {
      await mutation.mutateAsync(
        {
          ...data,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['project'],
            })
          },
        }
      )
      setIsOpen(false)
      reset()
    }
  }

  return (
    <FormModal
      title="Create Status"
      isOpen={isOpen}
      onClose={() => {
        if (!mutation.isLoading) {
          setIsOpen(false)
          reset()
        }
      }}
      isDataLoading={mutation.isLoading}
    >
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Fill the name field to create a new status
        </p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit(onSubmit)()
        }}
      >
        <ErrorFieldMessageWrapper error={errors.name}>
          <label>
            <input
              {...register('name', {
                required: 'Name is required',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20',
                },
                validate: (value) =>
                  value !== statuses.find((s) => value === s.name)?.name ||
                  'The status with such a name already exists',
                value: '',
              })}
              type="text"
              className={clsx(
                'border-2 border-slate-400 rounded-md',
                'px-2 mt-4 w-full',
                errors.name && 'focus:border-bittersweet'
              )}
              placeholder="Your status name"
              disabled={mutation.isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </label>
        </ErrorFieldMessageWrapper>
        <ActionButton
          type="submit"
          isActionLoading={isValid && mutation.isLoading}
        >
          Create
        </ActionButton>
      </form>
    </FormModal>
  )
}

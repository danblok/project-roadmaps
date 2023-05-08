import { addProject } from '@/api-handlers/api/project'
import { AddProjectInput } from '@/api-handlers/api/types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorFieldMessageWrapper from '../ErrorFieldWrapper'
import FormModal from '../FormModal'
import ActionButton from '../ActionButton'

type CreateProjectDialogProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  accountId: string
}

type FormData = AddProjectInput

export default function CreateProjectDialog({
  isOpen,
  setIsOpen,
  accountId,
}: CreateProjectDialogProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (project: AddProjectInput) => {
      return addProject(project)
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await mutation.mutateAsync(
      {
        ...data,
        ownerId: accountId,
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

  return (
    <FormModal
      title="Create Project"
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
          Fill the name and the discription (optional) fields to create a new
          project
        </p>
      </div>

      <form
        className="flex flex-col"
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
                  value: 50,
                  message: 'Max length is 50',
                },
                value: '',
              })}
              type="text"
              className={clsx(
                'border-2 border-slate-400 rounded-md',
                'px-2 mt-4 w-full',
                errors.name && 'focus:border-bittersweet'
              )}
              placeholder="Your project name"
              disabled={mutation.isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </label>
        </ErrorFieldMessageWrapper>
        <label className="mb-4">
          <textarea
            {...register('description')}
            name="description"
            className={clsx(
              'border-2 border-slate-400 rounded-md',
              'px-2 mt-4 w-full max-h-32'
            )}
            placeholder="Description"
            disabled={mutation.isLoading}
          />
        </label>
        <ActionButton type="submit" isActionLoading={mutation.isLoading}>
          Create
        </ActionButton>
      </form>
    </FormModal>
  )
}

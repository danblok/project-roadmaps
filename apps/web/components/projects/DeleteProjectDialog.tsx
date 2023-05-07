import { Dispatch, SetStateAction } from 'react'
import FormModal from '../FormModal'
import { deleteProject } from '@/api/project'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ErrorFieldMessageWrapper from '../ErrorFieldWrapper'
import useProjectContext from './ProjectContext'
import ActionButton from '../ActionButton'

type DeleteProjectDialogProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function DeleteProjectDialog({
  isOpen,
  setIsOpen,
}: DeleteProjectDialogProps) {
  const { project } = useProjectContext()
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (projectId: string) => {
      return deleteProject(projectId)
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>()

  const onSubmit = async () => {
    await mutation.mutateAsync(project.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['project'],
        })
        setIsOpen(false)
        router.push('/projects')
      },
    })
  }

  return (
    <FormModal
      title="Delete Project"
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
          Deleting the project will also delete all data related to it.
        </p>
        <p className="text-sm text-gray-500">
          In order to delete project, type in{' '}
          <span className="text-bittersweet font-bold">{project.name}</span> and
          press the button
        </p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit(onSubmit)()
        }}
        className="flex flex-col gap-4"
      >
        <ErrorFieldMessageWrapper error={errors.name}>
          <label>
            <input
              {...register('name', {
                required: 'Name is required',
                validate: (value) =>
                  value === project.name || 'Match with your name',
                value: '',
              })}
              type="text"
              className={clsx(
                'border-2 border-slate-400 rounded-md',
                'p-2 mt-4 w-full',
                errors.name && 'focus:border-bittersweet'
              )}
              placeholder="The project name"
              disabled={mutation.isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </label>
        </ErrorFieldMessageWrapper>
        <ActionButton type="submit" isActionLoading={mutation.isLoading}>
          Delete Project
        </ActionButton>
      </form>
    </FormModal>
  )
}

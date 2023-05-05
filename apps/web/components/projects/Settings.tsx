import { updateProject } from '@/api/project'
import { UpdateProjectInput } from '@/api/types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorFieldMessageWrapper from '../ErrorFieldWrapper'
import Loader from '../Loader'
import { Title } from '../Title'
import ActionButton from '../ActionButton'
import useProjectContext from './ProjectContext'
import DeleteProjectDialog from './DeleteProjectDialog'

type SettingsFormData = UpdateProjectInput

export default function Settings() {
  const { project, isProjectLoading } = useProjectContext()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (project: UpdateProjectInput) => {
      return updateProject(project)
    },
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SettingsFormData>()

  const onSubmit: SubmitHandler<SettingsFormData> = async (data) => {
    await mutation.mutateAsync(
      { ...data, id: project.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['project'],
          })
        },
      }
    )
  }

  return (
    <>
      <Title title="Project Settings" />
      {(mutation.isLoading || isProjectLoading) && <Loader />}
      <div className="my-6 flex flex-col md:flex-row gap-4 md:justify-around">
        <div className="basis-1/2 lg:basis-1/3 mx-4 border-b pb-6 border-b-gray md:border-b-0">
          <h3 className="text-xl font-bold text-cornflower-blue">
            Update your project data
          </h3>
          <form
            className="flex flex-col mt-6"
            onSubmit={async (e) => {
              e.preventDefault()
              await handleSubmit(onSubmit)()
            }}
          >
            <ErrorFieldMessageWrapper error={errors.name}>
              <label>
                <span className="text-lg block">Project name</span>
                <input
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 50,
                      message: 'Max length is 50',
                    },
                    value: project.name,
                  })}
                  type="text"
                  className={clsx(
                    'border-2 border-slate-400 rounded-md',
                    'px-2 mt-2 w-full',
                    errors.name && 'focus:border-bittersweet',
                    (isProjectLoading || mutation.isLoading) &&
                      'bg-opacity-100 text-cornflower-blue'
                  )}
                  placeholder="Your project name"
                  disabled={mutation.isLoading}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
              </label>
            </ErrorFieldMessageWrapper>
            <label className="my-4">
              <span className="text-lg">Project description</span>
              <textarea
                {...register('description', {
                  value: project.description,
                })}
                name="description"
                className={clsx(
                  'border-2 border-slate-400 rounded-md',
                  'px-2 mt-2 w-full max-h-32',
                  (isProjectLoading || mutation.isLoading) &&
                    'bg-opacity-100 text-cornflower-blue'
                )}
                placeholder="Description text"
                disabled={mutation.isLoading}
              />
            </label>
            <ActionButton isActionLoading={mutation.isLoading} type="submit">
              Update
            </ActionButton>
          </form>
        </div>
        <div className="basis-1/2 lg:basis-1/4 mx-4">
          <h3 className="text-xl font-bold text-cornflower-blue mb-4">
            Delete the project
          </h3>
          <ActionButton
            type="button"
            onClick={() => setIsDialogOpen(true)}
            isActionLoading={mutation.isLoading}
          >
            Delete
          </ActionButton>
        </div>
      </div>
      <DeleteProjectDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  )
}

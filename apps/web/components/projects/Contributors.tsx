import { removeContributor } from '@/api/project'
import { AddRemoveContributorInput } from '@/api/types'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import Loader from '../Loader'
import { Title } from '../Title'
import ContributorItem from './ContributorItem'
import ContributorSearchComboBox from './ContributorSearchComboBox'
import ActionButton from '../ActionButton'
import useProjectContext from './ProjectContext'

export default function Contributors() {
  const { project } = useProjectContext()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      projectId,
      contributorId,
    }: AddRemoveContributorInput) =>
      await removeContributor(projectId, contributorId),
  })

  async function handleDelete(contributorId: string) {
    await mutation.mutateAsync(
      {
        projectId: project.id,
        contributorId: contributorId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['project'])
        },
      }
    )
  }

  return (
    <>
      <Title title="Contributors" />
      {mutation.isLoading && <Loader />}
      <div className="mt-6 mx-2 lg:mx-8">
        <p className="text-center text-xl text-bittersweet w-full font-bold">
          Search contributors:{' '}
        </p>
        <ContributorSearchComboBox className="mt-4 flex flex-nowrap gap-1 items-center" />
        <div className="py-6">
          <h3 className="text-xl text-cornflower-blue text-center font-bold">
            Manage contributors
          </h3>
          <div className="flex flex-col gap-3 mt-4">
            {project.contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="flex flex-nowrap items-center gap-2"
              >
                <ContributorItem contributor={contributor} />
                <ActionButton
                  type="button"
                  samePadding
                  onClick={async () => await handleDelete(contributor.id)}
                >
                  <XMarkIcon width={20} height={20} />
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

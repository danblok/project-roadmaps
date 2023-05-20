import Head from 'next/head'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { getProject } from '@/api-handlers/api/project'
import Loader from '@/components/Loader'
import { GetServerSideProps } from 'next'
import { prisma } from 'database'
import { JWT, getToken } from 'next-auth/jwt'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Contributors, Settings, View } from '@/components/projects'
import { ProjectContext } from '@/components/projects/ProjectContext'
import { Tasks } from '@/components/projects'
import { useRouter } from 'next/router'

type ProjectProps = {
  accountId: string
  id: string
}

export default function ProjectPage({ accountId, id }: ProjectProps) {
  const router = useRouter()
  const {
    data: project,
    isLoading: isProjectLoading,
    isFetched,
  } = useQuery({
    queryKey: ['project'],
    queryFn: async () => await getProject(id),
  })

  if (isFetched && !project?.id) {
    return (
      <div className="h-full text-center flex flex-col items-center justify-center align-middle">
        <div>
          <h1 className="next-error-h1 inline-block mx-5 pr-6 text-2xl align-top leading-[49px]">
            404
          </h1>
          <div className="inline-block text-left sm:border-l sm:border-l-gray-500 pl-8">
            <h2 className="text-sm font-normal leading-[49px]">
              This page could not be found. Your project may have been deleted.
            </h2>
          </div>
        </div>
      </div>
    )
  }

  const isSessionUserNotOwner = accountId !== project?.ownerId

  return (
    <>
      <Head>
        <title>{project?.name}</title>
      </Head>
      <Tab.Group>
        <Tab.List className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap rounded-xl bg-white p-1 mx-4">
          <Tab
            className={({ selected }) =>
              clsx(
                'basis-1/2 rounded-lg py-2.5 text-lg font-bold leading-6 text-cornflower-blue transition-colors',
                selected
                  ? 'bg-cornflower-blue shadow text-white'
                  : 'text-cornflower-blue hover:bg-cornflower-blue/[0.2] hover:text-cornflower-blue'
              )
            }
          >
            View
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'basis-1/2 rounded-lg py-2.5 text-lg font-bold leading-6 text-cornflower-blue transition-colors',
                selected
                  ? 'bg-cornflower-blue shadow text-white'
                  : 'text-cornflower-blue hover:bg-cornflower-blue/[0.2] hover:text-cornflower-blue'
              )
            }
          >
            Tasks
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'basis-1/2 rounded-lg py-2.5 text-lg font-bold leading-6 text-cornflower-blue transition-colors',
                selected
                  ? 'bg-cornflower-blue shadow text-white'
                  : 'text-cornflower-blue hover:bg-cornflower-blue/[0.2] hover:text-cornflower-blue'
              )
            }
            disabled={isSessionUserNotOwner}
          >
            Contributors
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'basis-1/2 rounded-lg py-2.5 text-lg font-bold leading-6 text-cornflower-blue transition-colors',
                selected
                  ? 'bg-cornflower-blue shadow text-white'
                  : 'text-cornflower-blue hover:bg-cornflower-blue/[0.2] hover:text-cornflower-blue'
              )
            }
            disabled={isSessionUserNotOwner}
          >
            Settings
          </Tab>
        </Tab.List>
        <Tab.Panels className="mx-4 mt-6">
          {isProjectLoading || !project ? (
            <Loader />
          ) : (
            <ProjectContext.Provider value={{ project, isProjectLoading }}>
              <Tab.Panel className={clsx('rounded-xl bg-white p-3')}>
                <View />
              </Tab.Panel>
              <Tab.Panel className={clsx('rounded-xl bg-white p-3')}>
                <Tasks />
              </Tab.Panel>
              <Tab.Panel className={clsx('rounded-xl bg-white p-3')}>
                <Contributors />
              </Tab.Panel>
              <Tab.Panel className={clsx('rounded-xl bg-white p-3')}>
                <Settings />
              </Tab.Panel>
            </ProjectContext.Provider>
          )}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { sub, ...account } = (await getToken({
    req: req,
  })) as JWT

  const id = params?.id
  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      contributors: true,
      owner: true,
      statuses: true,
      tasks: {
        include: {
          status: true,
        },
      },
    },
  })

  const statuses = await prisma.status.findMany({
    where: {
      OR: [
        {
          projectId: id,
        },
        {
          projectId: null,
        },
      ],
    },
  })

  if (!project) {
    return {
      notFound: true,
    }
  }

  const queryClient = new QueryClient()
  queryClient.setQueryData(['project'], { ...project, statuses })

  return {
    props: {
      id,
      accountId: account.accountId,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

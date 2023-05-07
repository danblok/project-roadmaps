import Loader from '@/components/Loader'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { prisma } from 'database'
import { GetServerSideProps } from 'next'
import { JWT, getToken } from 'next-auth/jwt'
import Head from 'next/head'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { getProjects } from '@/api/project'
import { CreateProjectDialog, ProjectItem } from '@/components/projects'

type ProjectsProps = {
  accountId: string
}

export default function Projects({ accountId }: ProjectsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await getProjects(accountId),
  })

  return (
    <>
      <Head>
        <title>My projects</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={clsx(
            'mx-12 grid grid-flow-row gap-y-8',
            'sm:gap-x-6 sm:grid-cols-2 sm:mx-8',
            ' lg:grid-cols-3',
            'xl:gap-y-12 xl:grid-cols-4'
          )}
        >
          <div
            className="flex justify-center items-center bg-slate-50 rounded-xl p-4 shadow-lg lg:p-6 xl:p-8 hover:bg-white hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircleIcon className="text-cornflower-blue w-[100px] md:w-[125px] xl:w-[150px]" />
          </div>
          {projects?.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      )}
      <CreateProjectDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        accountId={accountId}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accountId } = (await getToken({
    req: context.req,
  })) as JWT

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: async () =>
      await prisma.project.findMany({
        where: {
          OR: [
            {
              ownerId: accountId,
            },
            {
              contributors: {
                some: {
                  id: accountId,
                },
              },
            },
          ],
        },
        include: {
          contributors: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      accountId,
    },
  }
}

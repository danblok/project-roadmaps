import { GetServerSideProps } from 'next'
import { JWT, getToken } from 'next-auth/jwt'
import { Project, User, prisma } from 'database'
import Head from 'next/head'
import clsx from 'clsx'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import CreateProjectDialog from '@/components/project/CreateProjectModal'
import ProjectItem from '@/components/project/ProjectItem'

type ProjectsProps = {
  data: (Project & {
    contributors: User[]
  })[]
  userId: string
}

export default function Projects({
  data: projects,
  userId,
}: ProjectsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Head>
        <title>My projects</title>
      </Head>
      <div
        className={clsx(
          'mt-12 mb-12 mx-12 grid grid-flow-row gap-y-8',
          'sm:gap-x-6 sm:grid-cols-2 sm:mx-8',
          'lg:mt-18 lg:mb-18 lg:grid-cols-3',
          'xl:mt-24 xl:mb-24 xl:gap-y-12 xl:grid-cols-4'
        )}
      >
        <div
          className="flex justify-center items-center bg-slate-50 rounded-xl p-4 shadow-lg lg:p-6 xl:p-8 hover:bg-white hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="text-cornflower-blue w-[100px] md:w-[125px] xl:w-[150px]" />
        </div>
        {[...projects].map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      <CreateProjectDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userId={userId}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps =
  async (context) => {
    const { userId } = (await getToken({
      req: context.req,
    })) as JWT

    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        contributors: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return {
      props: {
        data: projects,
        userId,
      },
    }
  }

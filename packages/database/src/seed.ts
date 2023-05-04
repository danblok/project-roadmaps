import { Prisma, prisma } from '.'

async function main() {
  try {
    await prisma.$transaction(async () => {
      // wipe out all data
      await prisma.task.deleteMany()
      await prisma.status.deleteMany()
      await prisma.project.deleteMany()
      await prisma.account.deleteMany()
      // uncomment if you don't have these in your local db
      await prisma.status.createMany({
        data: [
          {
            name: 'Ready',
          },
          {
            name: 'In Progress',
          },
          {
            name: 'Complete',
          },
        ],
      })
      const statuses = await prisma.status.findMany()
      const readyStatus = statuses.find(
        (status) => status.name === 'Ready'
      )
      const nums = new Array(10).fill(0).map((_, i) => ({
        name: `Test ${i}`,
        email: `test${i}@gmail.com`,
      }))

      const user = await prisma.account.create({
        data: {
          email: 'danytokmakov@gmail.com',
          name: 'Dotty',
        },
      })

      const projects: Prisma.ProjectCreateInput[] = [
        {
          name: 'Internal Project',
          owner: {
            connect: {
              id: user.id,
            },
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP1 Task 1',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP1 Task 2',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP1 Task 3',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP1 Task 4',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP1 Task 5',
                  statusId: readyStatus!.id,
                },
              ],
            },
          },
          contributors: {
            create: nums.slice(0, 3),
          },
        },
        {
          name: 'Internal Project 2',
          owner: {
            connect: {
              id: user.id,
            },
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP2 Task 1',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP2 Task 2',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP2 Task 3',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP2 Task 4',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP2 Task 5',
                  statusId: readyStatus!.id,
                },
              ],
            },
          },
          contributors: {
            create: nums.slice(3, 5),
          },
        },
        {
          name: 'Internal Project 3',
          owner: {
            create: nums.at(5),
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP3 Task 1',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP3 Task 2',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP3 Task 3',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP3 Task 4',
                  statusId: readyStatus!.id,
                },
                {
                  name: 'IP3 Task 5',
                  statusId: readyStatus!.id,
                },
              ],
            },
          },
          contributors: {
            connect: {
              id: user.id,
            },
            create: nums.slice(6, 8),
          },
        },
      ]
      await Promise.all(
        projects.map((project) =>
          prisma.project.create({
            data: project,
          })
        )
      )
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

void main()

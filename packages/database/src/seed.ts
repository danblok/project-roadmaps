import { Prisma, prisma } from '.'

async function main() {
  try {
    await prisma.$transaction(async () => {

      // uncomment if you don't have these in your local db
      await prisma.status.createMany({
        data: [
          {
            name: 'Ready',
          },
          {
            name: 'In Progress'
          },
          {
            name: 'Complete'
          },
        ]
      })
      const statuses = await prisma.status.findMany()
      const readyStatus = statuses.find(status => status.name === 'Ready')
      const user = await prisma.account.create({
        data: {
          email: "test@gmail.com",
          name: "Dotty",
        }
      })
      const projects: Prisma.ProjectCreateInput[] = [
        {
          name: 'Internal Project',
          owner: {
            connect: {
              id: user.id
            }
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP1 Task 1',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP1 Task 2',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP1 Task 3',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP1 Task 4',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP1 Task 5',
                  statusId: readyStatus!.id
                },
              ]
            }
          }
        },
        {
          name: 'Internal Project 2',
          owner: {
            connect: {
              id: user.id
            }
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP2 Task 1',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP2 Task 2',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP2 Task 3',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP2 Task 4',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP2 Task 5',
                  statusId: readyStatus!.id
                },
              ]
            }
          }
        },
        {
          name: 'Internal Project 3',
          owner: {
            connect: {
              id: user.id
            }
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP3 Task 1',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP3 Task 2',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP3 Task 3',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP3 Task 4',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP3 Task 5',
                  statusId: readyStatus!.id
                },
              ]
            }
          }
        },
        {
          name: 'Internal Project 4',
          owner: {
            connect: {
              id: user.id
            }
          },
          tasks: {
            createMany: {
              data: [
                {
                  name: 'IP4 Task 1',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP4 Task 2',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP4 Task 3',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP4 Task 4',
                  statusId: readyStatus!.id
                },
                {
                  name: 'IP4 Task 5',
                  statusId: readyStatus!.id
                },
              ]
            }
          }
        },
      ]
      await Promise.all(projects.map(project => prisma.project.create({
        data: project
      })))
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

void main()

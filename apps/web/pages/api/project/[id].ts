import { prisma } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id || typeof req.query.id !== 'string') {
    return res.status(404).json({ error: 'query error: missing id' })
  }

  if (req.method === 'GET') {
    const project = await prisma.project.findUnique({
      where: {
        id: req.query.id,
      },
      include: {
        contributors: true,
        owner: true,
        tasks: {
          include: {
            status: true,
          },
          orderBy: {
            until: 'asc',
          },
        },
      },
    })

    const statuses = await prisma.status.findMany({
      where: {
        OR: [
          {
            projectId: req.query.id,
          },
          {
            projectId: null,
          },
        ],
      },
    })

    return res.status(200).send({ data: { ...project, statuses } })
  }

  if (
    req.method === 'PATCH' &&
    req.query.contributorId &&
    typeof req.query.contributorId === 'string'
  ) {
    await prisma.project.update({
      where: {
        id: req.query.id,
      },
      data: {
        contributors: {
          connect: {
            id: req.query.contributorId,
          },
        },
      },
    })
    return res.status(200).send({})
  }

  if (req.method === 'PATCH') {
    await prisma.project.update({
      where: {
        id: req.query.id,
      },
      data: {
        ...req.body,
      },
    })
    return res.status(200).send({})
  }

  if (
    req.method === 'DELETE' &&
    req.query.contributorId &&
    typeof req.query.contributorId === 'string'
  ) {
    await prisma.project.update({
      where: {
        id: req.query.id,
      },
      data: {
        contributors: {
          disconnect: {
            id: req.query.contributorId,
          },
        },
      },
    })
    return res.status(200).send({})
  }

  if (req.method === 'DELETE') {
    await prisma.$transaction([
      prisma.project.update({
        where: {
          id: req.query.id,
        },
        data: {
          contributors: {
            set: [],
          },
          tasks: {
            deleteMany: {},
          },
          statuses: {
            deleteMany: {},
          },
        },
      }),
      prisma.project.delete({
        where: {
          id: req.query.id,
        },
      }),
    ])

    return res.status(200).send({})
  }

  return res.status(404).send({ error: 'unknown request method' })
}

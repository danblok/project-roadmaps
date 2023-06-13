import { prisma } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (!req.query.id || Array.isArray(req.query.id)) {
      return res.status(404).json({ error: 'query error' })
    }
    const account = await prisma.account.findUnique({
      where: {
        id: req.query.id,
      },
      include: {
        ownedProjects: {
          select: {
            _count: true,
          },
        },
        projects: {
          select: {
            _count: true,
          },
        },
      },
    })
    return res.status(200).send({ data: account })
  }

  if (req.method === 'DELETE') {
    if (!req.query.id || Array.isArray(req.query.id)) {
      return res.status(404).json({ error: 'query error' })
    }

    await prisma.$transaction([
      prisma.task.deleteMany({
        where: {
          project: {
            ownerId: req.query.id,
          },
        },
      }),
      prisma.status.deleteMany({
        where: {
          project: {
            ownerId: req.query.id,
          },
        },
      }),
      prisma.account.update({
        where: {
          id: req.query.id,
        },
        data: {
          ownedProjects: {
            deleteMany: {},
          },
          projects: {
            set: [],
          },
        },
      }),
      prisma.account.delete({
        where: {
          id: req.query.id,
        },
      }),
    ])

    return res.status(200).send({})
  }

  if (req.method === 'POST') {
    if (!req.query.id || Array.isArray(req.query.id)) {
      return res.status(404).json({ error: 'query error' })
    }
    const account = await prisma.account.update({
      where: {
        id: req.query.id,
      },
      data: req.body,
    })

    return res.status(200).send({ data: account })
  }

  return res.status(404).send({ error: 'unknown request method' })
}

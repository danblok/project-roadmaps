import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const project = await prisma.project.create({
      data: req.body,
    })
    return res.status(201).send({ data: project })
  }

  if (req.method === 'GET') {
    if (!req.query.accountId || typeof req.query.accountId !== 'string') {
      return res.status(404).json({ error: 'query error' })
    }
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          {
            ownerId: req.query.accountId,
          },
          {
            contributors: {
              some: {
                id: req.query.accountId,
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
    })

    return res.status(200).send({ data: projects })
  }

  return res.status(404).send({ error: 'unknown request method' })
}

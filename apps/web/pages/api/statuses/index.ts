import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.projectId || typeof req.query.projectId !== 'string') {
    return res.status(404).json({ error: 'query error' })
  }

  if (req.method === 'POST') {
    const task = await prisma.status.create({
      data: {
        projectId: req.query.projectId,
        ...req.body,
      },
    })

    return res.status(201).send({ data: task })
  }

  return res.status(404).send({ error: 'unknown request method' })
}

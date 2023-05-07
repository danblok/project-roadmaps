import { prisma } from 'database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id || typeof req.query.id !== 'string') {
    return res.status(404).json({ error: 'query error' })
  }

  if (req.method === 'PATCH') {
    const task = await prisma.task.update({
      where: {
        id: req.query.id,
      },
      data: {
        ...req.body,
      },
    })
    return res.status(200).send({ data: task })
  }

  if (req.method === 'DELETE') {
    await prisma.task.delete({
      where: {
        id: req.query.id,
      },
    })
    return res.status(200).send({})
  }

  return res.status(404).send({ error: 'unknown request method' })
}

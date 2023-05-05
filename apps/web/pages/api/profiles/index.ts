import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'database'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req })

  if (req.method === 'GET') {
    if (!req.query.filter || typeof req.query.filter !== 'string') {
      return res.status(404).json({ error: 'query error' })
    }
    const accounts = await prisma.account.findMany({
      where: {
        OR: [
          {
            name: {
              mode: 'insensitive',
              contains: req.query.filter,
            },
          },
          {
            email: {
              mode: 'insensitive',
              contains: req.query.filter,
            },
          },
        ],
      },
    })

    return res.status(200).send({ data: accounts })
  }

  return res.status(404).send({ error: 'unknown request method' })
}

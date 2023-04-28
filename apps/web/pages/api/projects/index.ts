import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from 'database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const project = await prisma.project.create({
      data: req.body
    })
    return res.status(201).send({ data: project })
  }

  return res.status(404).send({ error: 'unknown request method' })
}
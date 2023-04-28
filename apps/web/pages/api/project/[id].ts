import { prisma } from "database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const project = prisma.project.findUnique({
      where: req.query
    })

    return res.status(200).send({ data: project })
  }

  if (req.method === 'DELETE') {
    const project = prisma.project.delete({
      where: req.query
    })

    return res.status(200).send({ data: project })
  }

  return res.status(404).send({ error: 'unknown request method' })
}
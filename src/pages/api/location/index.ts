import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.status(405).json({ message: "Method not found." });
  }
}

// POST /api/user
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
  const locations = await prisma.location.findMany({});
  if (locations) {
    res.json({ locations });
  } else {
    res.status(404).json({ message: "Location not found." });
  }
}

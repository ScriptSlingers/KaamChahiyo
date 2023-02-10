import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else if (req.method === "GET") {
    await handleGET(res, req);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: "Method not found." });
  }
}

const handlePOST = async (res: NextApiResponse, req: NextApiRequest) => {
  const job = await prisma.job.create({
    data: req.body,
  });
  res.json(job);
};

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const jobs = await prisma.job.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      Location: {
        select: {
          name: true,
          displayName: true,
        },
      },
      postedBy: {
        select: {
          id: true,
          name: true,
        },
      },
      postedOn: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
      assignedOn: true,
    },
  });
  if (jobs) {
    res.json({ jobs });
  } else {
    res.status(404).json({ message: "Jobs not found." });
  }
};

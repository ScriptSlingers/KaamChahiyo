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
  const category = await prisma.category.create({
    data: req.body,
  });
  res.json(category);
};

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const categories = await prisma.category.findMany({});
  if (categories) {
    res.json({ categories });
  } else {
    res.status(404).json({ message: "Categories not found." });
  }
};

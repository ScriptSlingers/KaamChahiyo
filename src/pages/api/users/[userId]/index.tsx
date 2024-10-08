import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(res, req);
  }
  if (req.method === "PUT") {
    await handlePUT(res, req);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).json({ message: "Method not found." });
  }
}
const handlePUT = async (res: NextApiResponse, req: NextApiRequest) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (
      session.user["role"] === "admin" ||
      session.user["id"] === String(req.query.userId)
    ) {
      const user = await prisma.user.update({
        where: {
          id: String(req.query.userId),
        },
        data: {
          ...req.body,
          password: hashPassword(req.body.password),
        },
      });
      res.json(omit(user, "password"));
    }
  }
};

const handleGET = async (res: NextApiResponse, req: NextApiRequest) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    if (
      session.user["role"] === "admin" ||
      session.user["id"] === String(req.query.userId)
    ) {
      const user = await prisma.user.findFirst({
        where: { id: String(req.query.userId) },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          bio: true,
          role: true,
          status: true,
          dob: true,
          temporaryAddress: true,
          permananetAddress: true,
          phoneNumber: true,
          balance: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
      res.status(200).json(user);
    }
    res.status(401).json({ message: "Unauthorized User" });
  }
};

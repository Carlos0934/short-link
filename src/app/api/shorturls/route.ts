import { authOptions } from "@/lib/configs/nextAuth";
import createShortLink from "@/lib/shortUrl/createShortLink";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const GET = (req: Request) => {
  return Response.json({ message: "Hello from shortener!" });
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return Response.json(
      { message: "You are not authorized to create short links" },
      { status: 401 }
    );

  const { url } = await req.json();

  const result = await createShortLink(
    { url, userId: session.user.email },
    { prisma }
  );
  return Response.json(result);
};

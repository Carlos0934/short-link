import { authOptions } from "@/lib/configs/nextAuth";
import createShortLink from "@/lib/shortUrl/createShortUrl";
import deleteShortUrl from "@/lib/shortUrl/deleteShortUrl";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const DELETE = async (req: Request) => {
  try {
    const { id } = (await req.json()) as { id: string };

    await deleteShortUrl(id, { prisma });

    return Response.json({ message: "Short link deleted" });
  } catch (error) {
    return Response.json({ message: "An error occurred" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return Response.json(
      { message: "You are not authorized to create short links" },
      { status: 401 }
    );

  try {
    const { url } = await req.json();

    const result = await createShortLink(
      { url, userId: session.user.email },
      { prisma }
    );
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the short link" },
      { status: 500 }
    );
  }
};

import { CopyButton } from "@/components/CopyButton";
import LinkAnalytics from "@/components/LinkAnalytics";
import formatUrl from "@/lib/utils/formatUrl";
import getShortUrlAnalytics from "@/lib/shortUrl/getShortUrlAnalytics";
import getShortLinkByShortUrl from "@/lib/shortUrl/getShortUrlByPath";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import formatTimeAgo from "@/lib/utils/formatTimeAgo";
import { Button } from "@nextui-org/react";
import deleteShortUrl from "@/lib/shortUrl/deleteShortUrl";
import { useRouter } from "next/router";

export default async function Page({ params }: { params: { slug: string } }) {
  const prisma = new PrismaClient();
  const url = `${process.env.BASE_URL}/${params.slug}`;

  const shortLink = await getShortLinkByShortUrl(url, { prisma });

  if (!shortLink) return redirect("/dashboard");

  const analytics = await getShortUrlAnalytics(shortLink.id);

  const handleDelete = async (data: FormData) => {
    "use server";
    const id = data.get("id") as string;
    const prisma = new PrismaClient();
    await deleteShortUrl(id, { prisma });
    console.log("Short link deleted");

    redirect("/dashboard");
  };
  return (
    <div className="px-2 max-w-screen-md">
      <div className="flex justify-between">
        <h1 className="mt-5 font-semibold text-gray-200 truncate  max-w-lg  text-2xl">
          {formatUrl(shortLink.longUrl)}

          <span className="block text-gray-400 font-semibold text-sm">
            Created {formatTimeAgo(shortLink.createdAt)}
          </span>
        </h1>

        <form action={handleDelete}>
          <input type="hidden" name="id" value={shortLink.id} />
          <Button type="submit" variant="flat" color="danger">
            Delete
          </Button>
        </form>
      </div>

      <div className="mt-4  bg-gray-800 p-4 rounded-lg">
        <div className="mt-4 border-b border-gray-700 pb-4">
          <p>
            <span className="font-semibold text-lg text-gray-500">
              Shortened URL:
            </span>
          </p>
          <p className="text-gray-300 flex gap-4  ">
            {formatUrl(shortLink.shortUrl)}
            <CopyButton text={shortLink.shortUrl} />
          </p>
        </div>

        <LinkAnalytics analytics={analytics} />
      </div>
    </div>
  );
}

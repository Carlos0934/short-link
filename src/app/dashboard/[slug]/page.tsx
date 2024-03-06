import { CopyButton } from "@/components/CopyButton";
import LinkAnalytics from "@/components/LinkAnalytics";
import formatUrl from "@/lib/shortUrl/formatUrl";
import getShortUrlAnalytics from "@/lib/shortUrl/getShortUrlAnalytics";
import getShortLinkByShortUrl from "@/lib/shortUrl/getShortUrlByPath";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const prisma = new PrismaClient();
  const url = `${process.env.BASE_URL}/${params.slug}`;
  console.log(url);
  const shortLink = await getShortLinkByShortUrl(url, { prisma });
  if (!shortLink) return redirect("/dashboard");

  const analytics = await getShortUrlAnalytics(shortLink.id);

  return (
    <div className="px-2 ">
      <h1 className="mt-5 font-semibold text-gray-200  text-2xl">
        {formatUrl(shortLink.longUrl)}
      </h1>
      <div className="mt-4 max-w-screen-md bg-gray-800 p-4 rounded-lg">
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

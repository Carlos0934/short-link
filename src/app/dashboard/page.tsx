import { CopyButton } from "@/components/CopyButton";
import DashboardHeader from "@/components/DashboardHeader";
import { authOptions } from "@/lib/configs/nextAuth";
import findShortUrls from "@/lib/shortUrl/findShortUrl";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import extractPathFromUrl from "@/lib/utils/extractPathFromUrl";
import formatUrl from "@/lib/utils/formatUrl";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const prisma = new PrismaClient();

  if (!session?.user?.email) {
    return redirect("/");
  }
  const data = await findShortUrls({ userId: session.user.email }, { prisma });

  return (
    <>
      <section className="mt-4 ml-2 max-w-screen-lg">
        <DashboardHeader />

        <ul className="mt-8 grid grid-cols-3  gap-4 ">
          {data.length === 0 && (
            <div className="flex items-center col-span-3 justify-center text-gray-400">
              <p className="text-xl font-semibold">No links yet</p>
            </div>
          )}

          {data.map((link) => (
            <li
              key={link.id}
              className="flex flex-col cursor-pointer hover:bg-gray-800 transition-all 
              justify-between p-4 border border-gray-600  rounded-md"
            >
              <Link href={`/dashboard/${extractPathFromUrl(link.shortUrl)}`}>
                <p className="">
                  <span className="font-semibold  text-sm  "> URL:</span>
                  <span className="block font-semibold hover:underline text-sm text-gray-400 ">
                    {formatUrl(link.longUrl)}
                  </span>
                </p>
                <p className="mt-2">
                  <span className="block text-sm font-semibold text-gray-500 mt-2">
                    Shortened URL:
                  </span>{" "}
                  <span className=" text-sm flex justify-between text-gray-400 ">
                    {formatUrl(link.shortUrl)}

                    <CopyButton text={link.shortUrl} />
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

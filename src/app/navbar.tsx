"use client";
import { Button, Image } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 border-b-1 border-gray-800 ">
      <div className="flex items-center">
        <Link href="/" className="ml-2 text-white font-bold">
          Short Link
        </Link>
      </div>
      <ul className="flex items-center space-x-4">
        {!data?.user && (
          <li>
            <Button
              className="bg-gradient-to-tr from-pink-700 to-blue-500 text-white shadow-lg"
              variant="flat"
              onClick={() => signIn("github")}
            >
              Sign In
            </Button>
          </li>
        )}
        {data?.user && (
          <>
            <li className="text-white hover:text-gray-300">
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <li>
              <a href="/profile" className="text-white hover:text-gray-300">
                <Image
                  src={data.user.image as string}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </a>
            </li>
            <li>
              <Button onClick={() => signOut()} variant="flat" color="danger">
                Sign Out
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

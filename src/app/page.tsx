import { Input, Snippet } from "@nextui-org/react";

export const metadata = {
  title: "Short Link",
  description: "A simple URL shortening service",
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-5xl text-center font-bold mb-8">
        Welcome to Short Link
      </h1>

      <p className="text-center text-balance text-gray-200">
        This is a simple URL shortening service. You can create a short link to
        any URL you want to share. Just paste your long URL into the input box
        and click the button to get a short link.
      </p>

      <div className="flex flex-col items-center justify-center mt-8">
        <Input
          size="sm"
          placeholder="Paste your long URL here"
          className="w-96  "
          variant="flat"
          readOnly
          disabled
          defaultValue="https://www.example.com/very-long-url"
        />
        <Snippet symbol="" variant="bordered" className="text-white mt-8">
          https://short.link/
        </Snippet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="border-2 border-gray-100 rounded-md p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-balance ">
            Tracking and analytics
          </h3>
          <p className="text-balance text-gray-200">
            You can track how many people have clicked your short link and where
            they are from.
          </p>
        </div>

        <div className="border-2 border-gray-100 rounded-md p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-balance ">Low latency</h3>
          <p className="text-balance text-gray-200">
            Your short links will be available anywhere in the world with low
            latency and high availability thanks to edge locations.
          </p>
        </div>

        <div className="border-2 border-gray-100 rounded-md p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-balance ">
            Manage your links easily
          </h3>
          <p className="text-balance text-gray-200">
            You can manage your short links easily with a simple dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}

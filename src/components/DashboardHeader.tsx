"use client";

import { Button } from "@nextui-org/react";
import LinkModal from "./LinkModal";
import { useState } from "react";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center border-b p-4 border-gray-700">
      <h2 className="text-xl font-semibold text-gray-200 ">Your Links</h2>
      <Button
        className=""
        color="primary"
        variant="solid"
        onClick={() => setIsOpen(true)}
      >
        Create New Link
      </Button>

      <LinkModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </header>
  );
}

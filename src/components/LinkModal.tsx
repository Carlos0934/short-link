"use client";

import useForm from "@/hooks/useForm";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

type LinkModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LinkModal({ isOpen, onOpenChange }: LinkModalProps) {
  const router = useRouter();
  const { formRef, status, reset, onSubmit } = useForm({
    initialState: {
      url: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/shorturls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values.data),
        });

        if (!res.ok) throw new Error("Failed to create link");
        router.refresh();
        onOpenChange(false);
      } catch (error) {
        if (error instanceof Error) {
          return { errors: { url: error.message } };
        }

        console.error(error);
      }
    },
  });

  const onClose = () => {
    reset();
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent className="bg-gray-800">
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-semibold text-gray-200">
                Create New Link
              </h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit} ref={formRef}>
                <div className="mb-4">
                  <Input
                    variant="bordered"
                    className=" "
                    label="URL"
                    name="url"
                    required
                    errorMessage={status.errors.url}
                    placeholder="Enter the URL"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={status.loading}
                    className="w-full"
                    color="primary"
                    variant="solid"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                color="danger"
                variant="bordered"
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

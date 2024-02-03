"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "components/Button";
import { track } from "lib/tracking";
import { Calendar, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  date: string;
  url: string;
}

export const NextStammtischClient = ({ id, date, url }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = "shown-stammtisch";

  useEffect(() => {
    const shownStammtisch = localStorage.getItem(storageKey);
    if (shownStammtisch === id) return;

    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [id]);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem(storageKey, id);
      track("Next Stammtisch closed");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className="animate-in slide-in-from-bottom-1/2 fade-in-50 sm:slide-in-from-left-1/2 sm:slide-in-from-bottom-0 fixed bottom-0 left-0 right-0 m-4 bg-pink p-4 text-pink-light duration-200 ease-out sm:right-auto sm:w-auto sm:min-w-[400px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="mb-2 text-base font-bold text-light">
            Nächster Stammtisch
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            Am <span className="font-bold">{date}</span> im{" "}
            <a
              href="https://maps.app.goo.gl/bgpY6u8SerF1wMbZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Makers Inn
            </a>
            .<br />
            Jeder ist willkommen!
          </Dialog.Description>
          <div className="flex justify-end">
            <Button
              size="small"
              href={url}
              target="_blank"
              rel="noopener"
              onClick={() => {
                track("Next Stammtisch clicked");
              }}
            >
              <Calendar size={18} />
              Komm vorbei
            </Button>
          </div>
          <Dialog.Close className="absolute right-0 top-0 m-2 p-2 text-pink-light">
            <X size={18} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

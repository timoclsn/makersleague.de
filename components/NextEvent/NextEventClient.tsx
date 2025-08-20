"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "components/Button";
import { TouchTarget } from "components/TouchTarget";
import { track } from "lib/tracking";
import { Calendar, X } from "lucide-react";
import { Route } from "next";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  name: string;
  date: string;
  url: string;
}

export const NextEventClient = ({ id, name, date, url }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = "shown-next-event";

  useEffect(() => {
    const shownNextEvent = Number(localStorage.getItem(storageKey));
    if (shownNextEvent === id) return;

    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [id]);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem(storageKey, String(id));
      track("Next Event closed", { name });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className="bg-pink text-pink-light animate-in fade-in-50 zoom-in-95 slide-in-from-bottom-1/2 sm:slide-in-from-bottom-0 sm:slide-in-from-left-1/2 fixed right-0 bottom-0 left-0 m-4 p-4 text-sm duration-200 ease-out sm:right-auto sm:w-auto sm:min-w-[500px] sm:text-base"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="text-light mb-2 font-bold">
            Nächstes Event
          </Dialog.Title>
          <Dialog.Description className="mb-2 sm:mb-4">
            <span className="mb-2 block max-w-[400px]">{name}</span>
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
            Jede*r ist willkommen!
          </Dialog.Description>
          <div className="flex flex-col justify-end sm:flex-row">
            <Button
              color="light"
              size="small"
              href={url as Route}
              target="_blank"
              rel="noopener"
              onClick={() => {
                track("Next Event clicked", { name });
              }}
            >
              <Calendar size={18} />
              Komm vorbei
            </Button>
          </div>
          <Dialog.Close className="text-pink-light absolute top-0 right-0 m-2 p-2">
            <TouchTarget>
              <X size={18} />
            </TouchTarget>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

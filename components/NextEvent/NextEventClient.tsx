"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "components/Button";
import { TouchTarget } from "components/TouchTarget";
import { track } from "lib/tracking";
import { Calendar, X } from "lucide-react";
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
          className="fixed bottom-0 left-0 right-0 m-4 bg-pink p-4 text-sm text-pink-light duration-200 ease-out animate-in fade-in-50 zoom-in-95 slide-in-from-bottom-1/2 sm:right-auto sm:w-auto sm:min-w-[500px] sm:text-base sm:slide-in-from-bottom-0 sm:slide-in-from-left-1/2"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="mb-2 font-bold text-light">
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
              href={url}
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
          <Dialog.Close className="absolute right-0 top-0 m-2 p-2 text-pink-light">
            <TouchTarget>
              <X size={18} />
            </TouchTarget>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

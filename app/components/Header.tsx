"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import RockiesPic from "../../public/assets/rockies-img.jpg";
import Link from "next/link";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { PiLinkSimpleHorizontal } from "react-icons/pi";
import { Copy } from "lucide-react";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type Props = {};

const Header: FC<Props> = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex s">
            <Link
              aria-current="page"
              className="flex items-center gap-1"
              href="/"
            >
              <Image
                className=" h-10 w-auto rounded-full"
                src={RockiesPic}
                alt="Rockies"
                width={100}
                height={100}
              />
              <p
                className={`font-semibold text-[25px] tracking-tight bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent`}
              >
                Rockies
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-1 ">
            <Link
              className="inline-block rounded-lg px-2 py-1  text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:!text-gray-900"
              href="#menu"
            >
              Menu
            </Link>
            <Link
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1  text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:!text-gray-900"
              href="#about"
            >
              About
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-2 rounded-full">
                  {" "}
                  <PiLinkSimpleHorizontal size={25} className={``} />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-md !rounded-3xl w-[95%]"
                onOpenAutoFocus={() => {
                  const inputElement = document.getElementById("link");
                  if (
                    inputElement &&
                    inputElement instanceof HTMLInputElement
                  ) {
                    inputElement.focus();
                    inputElement.selectionStart = inputElement.selectionEnd = 0;
                  }
                }}
              >
                <DialogHeader>
                  <DialogTitle>Share Rockies&#39;s links</DialogTitle>
                  <DialogDescription>
                    Share Rockies&#39;s links with your friends.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue="https://www.instagram.com/rockies.eg/"
                      readOnly
                      autoFocus={false}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3 transition-all"
                    onClick={async () => {
                      {
                        await navigator.clipboard.writeText(
                          "https://www.instagram.com/rockies.eg/"
                        );
                        handleCopy();
                      }
                    }}
                    disabled={copied}
                  >
                    <span className="sr-only">Copy</span>
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

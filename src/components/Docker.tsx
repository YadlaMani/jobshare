"use client";

import React from "react";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoLogoGithub } from "react-icons/io5";
import { ModeToggle } from "./ui/mode-toggle";

const Docker = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider>
        <Dock direction="middle">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://github.com/YadlaMani/jobshare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full transition-transform hover:scale-125"
                  )}
                >
                  <IoLogoGithub size={64} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Github</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <ModeToggle />
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
};

export default Docker;

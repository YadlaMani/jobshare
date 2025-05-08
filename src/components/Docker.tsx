"use client";

import React from "react";
import Link from "next/link";

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
        <div className="flex items-center gap-4 bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-muted">
          <div className="flex justify-center items-center">
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
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex justify-center items-center">
            <ModeToggle />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Docker;

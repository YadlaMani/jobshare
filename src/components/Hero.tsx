import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="container relative mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center">
        <div className="hidden lg:block absolute right-10 top-20 w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 dark:bg-blue-400 dark:bg-opacity-10 animate-pulse"></div>
        <div className="hidden lg:block absolute left-32 bottom-40 w-20 h-20 rounded-full bg-indigo-500 bg-opacity-20 dark:bg-indigo-400 dark:bg-opacity-10 animate-pulse [animation-delay:1000ms]"></div>
        <div className="hidden lg:block absolute right-40 bottom-20 w-16 h-16 rounded-full bg-violet-500 bg-opacity-20 dark:bg-violet-400 dark:bg-opacity-10 animate-pulse [animation-delay:2000ms]"></div>

        <Badge
          variant="outline"
          className="bg-background/90 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-8"
        >
          ✨ The infinite sum game for opportunities
        </Badge>

        <h1 className="text-3xl font-bold mb-4 md:mb-0 text-center max-w-4xl mb-6">
          <span className="text-blue-600 dark:text-blue-400">
            Share & Discover
          </span>
          <br />
          <span className="text-gray-900 dark:text-gray-100">
            Opportunities Together
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10">
          Post opportunities, find new connections, and create a network where
          everyone wins. A platform built on collaboration, not competition.
        </p>
      </div>
    </section>
  );
}

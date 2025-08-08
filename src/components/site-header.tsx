import { Icons } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">FlashGenius</span>
        </div>
      </div>
    </header>
  );
}

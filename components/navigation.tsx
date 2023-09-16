import ThemeToggle from "@/components/theme-toggle";
import { GlobeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Link className="-m-1.5 p-1.5 inline-flex" href="/">
            <GlobeIcon className="h-8 w-auto" />{" "}
            <span className="text-2xl font-semibold pl-3">
              DNS<span className="font-bold">Buddy</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:flex-1 justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

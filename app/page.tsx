import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-purple-950 ">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-2 px-16  dark:text-white gap-20">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Tricli logo"
          width={100}
          height={20}
          priority
        /> 
        <h2>This is the application that hosts the list of our favorite triangles corners</h2>
        <Link
            href="/dashboard"
            className="flex items-center rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
          >
            <span>Enter here</span>
          </Link>
      </main>
    </div>
  );
}

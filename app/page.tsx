import Image from "next/image";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="grid grid-rows-2 md:grid-cols-2 min-h-screen w-full items-center justify-center">
        <div className="flex flex-col bg-purple-900 text-white py-2 px-16 md:min-h-screen h-full items-center justify-center">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Tricli logo"
            width={100}
            height={20}
            priority
          />
          <h2>This is the application that hosts the list of our favorite triangles corners</h2>
        </div>
        <div className="w-full flex items-center justify-center">
          <Suspense fallback={<>...</>}>
            <LoginForm></LoginForm>
          </Suspense> 
        </div>
      </main>
    </div>
  );
}

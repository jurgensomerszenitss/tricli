import Image from "next/image"
import Link from "next/link"; 
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from '@/auth';

export default function SideNav() {

  return (
    <div className="grid grid-cols-2 w-full p-3 bg-purple-950 items-stretch">
      <Link  href={`/dashboard`}>
        <Image
          className="dark:invert cursor-pointer"
          src="/logo.svg"
          alt="Tricli logo"
          width={50}
          height={20}
          priority
        />  
      </Link>
      <div className="flex justify-end items-center ">
         <form  action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
          <button className="flex items-center bg-none cursor-pointer">
            <ArrowRightStartOnRectangleIcon className="dark:invert" width={30} height={30}></ArrowRightStartOnRectangleIcon>
          </button>
        </form> 
      </div>
      <></>
    </div>
  )
} 
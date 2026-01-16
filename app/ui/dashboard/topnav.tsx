import Image from "next/image"
export default function SideNav() {
  return (
    <div className="flex flex-col w-full p-3  bg-purple-950">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Tricli logo"
          width={50}
          height={20}
          priority
        /> 
    </div>
  )
} 
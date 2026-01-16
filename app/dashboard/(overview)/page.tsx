import Filter from "@/app/ui/dashboard/filter";
import List from "@/app/ui/dashboard/list";
import { getDashboard } from "@/app/lib/queries"
import Link from "next/link";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    hasParking:boolean,
    hasTerrace?:boolean,
    isOpen?:boolean,
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const data = await getDashboard(searchParams); 

  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between">
      <Filter></Filter>
      <List data={data?.cards}></List>
      <Link className="bg-purple-950 hover:bg-amber-500 rounded-full w-15 h-15 text-white text-4xl justify-center items-center flex absolute bottom-4 right-4" href="/dashboard/create">+</Link>
    </div>
  );
}

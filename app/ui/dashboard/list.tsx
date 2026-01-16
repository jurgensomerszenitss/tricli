
import { CardData } from "@/app/lib/models";
import { Card } from "./card"

export default async function List( {data} : {data:CardData[]}) {
  return (
    <div className="flex flex-wrap gap-1 m-4 flex-row justify-center md:justify-start">
        { data?.map((item) => (
          <Card key={item.id} data={item}></Card> 
        ))}
    </div>
  )
} 
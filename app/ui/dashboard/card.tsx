import { CardData } from "@/app/lib/models";
import Image from "next/image";
import Rating from "@/app/ui/rating";
import Link from "next/link";
export function Card({ data }: { data: CardData }) {
  return (
    <div className="grid grid-cols-2 border-stone-400 rounded-xl border-solid border-2 p-2 min-w-80 bg-purple-50">
      <Link href={`/dashboard/${data.id}`}><b>{data.name}</b></Link>
      {/* <b>{data.name}</b> */}
      <div className="flex flex-row px-1 gap-x-0 justify-end items-center">
        <div className="grid grid-cols-2 px-1 gap-x-2 mr-4  items-center">
         
          <Image className={`${data.hasParking ? 'block' : 'invisible'}`}
            src="/parking.svg"
            alt="🅿"
            width={15}
            height={15}></Image>
           
         <Image className={`${data.hasTerrace ? 'block' : 'invisible'}`}  
            src="/terrace.svg"
            alt="⛱"
            width={15}            
            height={15}></Image>
        {/* <span className={`text-blue-800 text-xl ${data.hasParking ? 'block' : 'invisible'}`}>🅿</span>
        <span className={`text-amber-600 text-xl ${data.hasTerrace ? 'block' : 'invisible'}`}>⛱</span> */}
           
        </div>
        <Rating count={3} iconSize={15} value={data.level} readOnly={true} />
        {/* {[1, 2, 3].map((i) => (
          <Image
            key={i}
            src={data.level >= i ? '/star-full.svg' : '/star-empty.svg'}
            alt={`${i <= data.level ? i : 'No'} star${i > 1 ? 's' : ''}`}
            width={15}
            height={15}
          />
        ))} */}

      </div>

    </div>
  );
}
import Image from "next/image"
import SearchText from '@/app/ui/dashboard/searchText';
import SearchCheckbox from "@/app/ui/dashboard/searchCheckbox";

export default function Filter() {
  return (
    <div className="flex flex-col gap-1">
      <fieldset>
        <div className="rounded-md border border-gray-200 bg-purple-50 px-3.5 py-3  ">
          <div className="flex gap-4">
            <SearchText placeholder="Search restaurants..." />
            <SearchCheckbox image="/parking.svg" alt="Only with parking" queryName="hasParking"/>
            <SearchCheckbox image="/terrace.svg" alt="Only with terrace" queryName="hasTerrace"/>
            <SearchCheckbox image="/open-sign.svg" alt="Is open" queryName="isOpen"/>            
          </div>
        </div>
      </fieldset> 
    </div>
  )
} 
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import Image from "next/image"

export default function SearchCheckbox({ image, alt, queryName }: { image: string, alt: string, queryName: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const id = `chk${queryName}`
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: boolean) => {
        const params = new URLSearchParams(searchParams); 
        if (term) {
            params.set(queryName, 'true');
        } else {
            params.delete(queryName);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex items-center">
            <input
                id={id}
                name={id}
                type="checkbox"
                value="true"
                defaultChecked={searchParams.get(queryName)?.toString() == 'true'}  
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-purple-500  mr-1"
                onChange={(e) => {
                    handleSearch(e.target.checked);
                }}
            />
            <Image
                src={image}
                alt={alt}
                width={20}
                height={20}></Image>

        </div>
    );
}

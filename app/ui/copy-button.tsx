'use client'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { copyToClipboard } from '@/app/lib/copy';

export default function CopyButton(props: { value:string | undefined | null}) {

     const copy = () => {
        if (props.value) {
            copyToClipboard(props.value)
        } 
    }

    return (<div onClick={() => copy()}><DocumentDuplicateIcon className="w-4 h-4 cursor-pointer" /></div> )
}
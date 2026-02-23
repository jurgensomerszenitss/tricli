'use client'

import { ArchiveBoxXMarkIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface ButtonProps {
    onClick?: () => void;
}

export default function DeleteButton({ onClick }: ButtonProps) {

    const [confirming, setConfirming] = useState(false);



    const handleConfirm = (confirmed: boolean = false) => {
        if (confirmed) {
            onClick?.()
        }
        setConfirming(false)
    }

    return (
        <div className="button-delete-container flex flex-col items-center justify-center">
            <div className={`p-1 ${confirming ? 'hidden' : 'block'}`}>
                <div className={`button-delete m-1 `} onClick={() => setConfirming(true)}>
                    <ArchiveBoxXMarkIcon className="h-6 w-6"></ArchiveBoxXMarkIcon>
                </div>
            </div>

            <div className={`flex flex-row  bg-gray-300 p-1 rounded-full items-center gap-x-4 ${confirming ? 'block' : 'hidden'}`}>
                <div className="button-delete-no" onClick={() => handleConfirm(false)}>
                    <HandThumbDownIcon className="h-6 w-6"></HandThumbDownIcon>
                </div>
                <span className="sm:block hidden">Are you sure?</span>
                <div className="button-delete-yes" onClick={() => handleConfirm(true)}>
                    <HandThumbUpIcon className="h-6 w-6"></HandThumbUpIcon>
                </div>
            </div>
        </div>
    )
}
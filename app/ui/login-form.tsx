'use client';
import { useSearchParams } from "next/navigation"; 
import { useActionState, } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from '@/app/ui/button';
import { authenticate } from "@/app/lib/auth";
import { ExclamationCircleIcon, AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    
    return (
        <div className="border-purple-400 rounded-xl border-solid border p-2 min-w-80 m-10 w-80">
            <form action={formAction}> 
                <div className="flex flex-col">
                    <label
                        className="login-label"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="flex flex-row items-center">
                        <input
                            name="email"
                            className="login-field"
                            type="text"
                            placeholder="Enter email"
                            required></input>
                        <AtSymbolIcon className="w-6 h-6 text-gray-500 relative right-6" />
                    </div>

                    <label
                        className="login-label "
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="flex flex-row items-center">
                        <input
                            name="password"
                            className="login-field"
                            type="password"
                            placeholder="Enter password"
                            required
                            minLength={6}></input>
                        <KeyIcon className="w-6 h-6 text-gray-500 relative right-6" />
                    </div> 
                    <input type="hidden" name="redirectTo"  value={callbackUrl} />
                    <Button type="submit" className="flex items-center rounded-lg bg-purple-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base cursor-pointer mt-8 mx-6">
                        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                   
                     <div id="error" aria-live="polite" aria-atomic="true" className="w-full mx-6 mt-4">
                        {errorMessage && (<p className="form-field-error flex flex-row gap-x-1 items-center"><ExclamationCircleIcon className="h-5 w-5 text-red-500" /> {errorMessage}</p>)}
                    </div>

                </div>

            </form>
        </div>
    );
}

'use client';

import { Address } from "@/app/lib/models";

type Props = {
    control: any,
    register: any,
    errors: any
}

export default function AddressField({ control, register, errors }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-6 gap-x-8 justify-items-stretch w-full">
                {/* Street */}
                <div className="mb-4 col-span-4 ">
                    <label htmlFor="street" className="field-label">
                        Street
                    </label>
                    <div className="relative">
                        <input
                            {...register(`address.street`)}
                            type="text"
                            placeholder="Enter street"
                            className="form-field"
                        />
                    </div>
                </div>

                {/* Number */}
                <div className="mb-4 col-span-2">
                    <label htmlFor="number" className="field-label">
                        Number
                    </label>
                    <div className="relative">
                        <input
                            {...register(`address.number`)}
                            type="text"
                            placeholder="Enter number"
                            className="form-field"
                        />
                    </div>
                </div>
            </div>

            {/* City */}
            <div className="mb-4">
                <label htmlFor="city" className="field-label">
                    City
                </label>
                <div className="relative">
                    <input
                        {...register(`address.city`)}
                        type="text"
                        placeholder="Enter city"
                        className="form-field"
                    />
                </div>
                <div id="city-error" aria-live="polite" aria-atomic="true">
                    {errors.address?.city && (<p className="form-field-error">{errors.address?.city?.message}</p>)}
                </div>
            </div>
        </div>
    )
}
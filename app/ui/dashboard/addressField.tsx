'use client';

type Props = {
    register: any;
    errors?: any,
    prefix?: string | undefined
}

export default function AddressField({ register, errors, prefix = 'address' }: Props) {

    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-6 xl:grid-cols-12  gap-x-8 justify-items-stretch w-full">
                {/* Street */}
                <div className="mb-4 col-span-4 ">
                    <label htmlFor="street" className="field-label">
                        Street
                    </label>
                    <div className="relative">
                        <input
                            {...register(`${prefix}.street`)}
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
                            {...register(`${prefix}.number`)}
                            type="text"
                            placeholder="Enter number"
                            className="form-field"
                        />
                    </div>
                </div>

                {/* City */}
                <div className="mb-4 col-span-6">
                    <label htmlFor="city" className="field-label">
                        City
                    </label>
                    <div className="relative">
                        <input
                            {...register(`${prefix}.city`)}
                            type="text"
                            placeholder="Enter city"
                            className="form-field"
                        />
                    </div>
                    <div id="city-error" aria-live="polite" aria-atomic="true">
                        {errors?.city && (<p className="form-field-error">{errors?.city?.message}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import TableArray from '@/app/ui/dashboard/tableArray';
import Rating from '@/app/ui/rating';
import AddressField from '@/app/ui/dashboard/addressField';
import { CheckIcon, XMarkIcon, BuildingStorefrontIcon, MapPinIcon, ClockIcon, PhotoIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { FormValues, formSchema } from '@/app/lib/schemas';

type Props = {
    initialValues: FormValues | undefined,
    onSubmit: (data: FormValues) => Promise<void>;
};

export default function Form({ initialValues, onSubmit }: Props) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { ...initialValues },
    }); 

    const submitHandler = async (data: FormValues) => { 
        console.log("test")
        console.log(errors)
        try {
            await onSubmit(data);

        } catch (err: any) {
        }
    };

    return (
        <form onSubmit={ () => {console.log(errors); return handleSubmit(submitHandler)}} method='POST'>
            <div className="flex flex-col gap-y-2">
                {/* General */}
                <div className="form-card">

                    <div className="form-card-title"><BuildingStorefrontIcon className="h-6 w-6"></BuildingStorefrontIcon>General</div>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="field-label">
                            Name
                        </label>
                        <div className="relative">
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Enter name"
                                className="form-field"
                            />
                        </div>
                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {errors?.name && (<p className="form-field-error">{errors.name?.message}</p>)}
                        </div>
                    </div>

                    {/* level */}
                    <div className="mb-4">
                        <label htmlFor="level" className="field-label">
                            Level
                        </label>
                        <div className="relative flex flex-row">
                            <Controller
                                control={control}
                                name="level"
                                render={({ field: { onChange, value } }) => (
                                    <Rating
                                        count={3}
                                        iconSize={20}
                                        readOnly={false}
                                        name="level"
                                        value={value}
                                        onChange={(val) => onChange(val)} // Manually pass the number to react-hook-form
                                    />
                                )}
                            />
                        </div>
                        <div id="level-error" aria-live="polite" aria-atomic="true">
                            {errors.level && (<p className="form-field-error">{errors.level?.message}</p>)}
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="mb-4">
                        <label htmlFor="facilities" className="field-label">
                            Facilities
                        </label>
                        <div className="">
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        {...register(`hasParking`)}
                                        type="checkbox"
                                        placeholder="Has a parking"
                                        className="form-field-checkbox"
                                    />
                                    <label
                                        htmlFor="pending"
                                        className="field-label-checkbox"
                                    >
                                        Has a parking
                                    </label>
                                    <Image
                                        alt='parking'
                                        src='/parking.svg'
                                        width={20}
                                        height={20}></Image>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        {...register(`hasTerrace`)}
                                        type="checkbox"
                                        placeholder="Has a terrace"
                                        className="form-field-checkbox"
                                    />
                                    <label
                                        htmlFor="pending"
                                        className="field-label-checkbox"
                                    >
                                        Has a terrace
                                    </label>
                                    <Image alt='terrace'
                                        src='/terrace.svg'
                                        width={20}
                                        height={20}></Image>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Address */}
                <div className="form-card">
                    <div className="form-card-title"><MapPinIcon className="h-6 w-6"></MapPinIcon>Address</div>
                    {/* <AddressField control={control} register={register} errors={errors} ></AddressField>  */}
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

                {/* Contact info */}
                <div className="form-card">
                    <div className="form-card-title"><PhoneIcon className="h-6 w-6"></PhoneIcon>Contact info</div>
                </div>

                {/* Tables */}
                <div className="form-card flex flex-col">
                    <div className="form-card-title"><Image className="h-6 w-6" src="/table.svg" width={24} height={24} alt="table"></Image>Tables</div>
                    <TableArray control={control} register={register} errors={errors} ></TableArray>
                </div>

                {/* Opening hours */}
                <div className="form-card">
                    <div className="form-card-title"><ClockIcon className="h-6 w-6"></ClockIcon>Opening hours</div>
                </div>

                {/* Photos */}
                <div className="form-card">
                    <div className="formd-card-title"><PhotoIcon className="h-6 w-6"></PhotoIcon>Photos</div>
                </div>
            </div>
            <div className="button-group">
                <Link href="/dashboard" className="button-cancel" >
                    <XMarkIcon className="h-6 w-6"></XMarkIcon>
                </Link>
                <Button type="submit" className="button-submit" ><CheckIcon className="h-6 w-6"></CheckIcon></Button>
            </div> 
        </form>
    );
} 

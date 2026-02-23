'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import TableArray from '@/app/ui/dashboard/form/table-array';
import Rating from '@/app/ui/rating';
// import AddressField from '@/app/ui/dashboard/form/address-field';
import { CheckIcon, XMarkIcon, BuildingStorefrontIcon, MapPinIcon, ClockIcon, PhotoIcon, PhoneIcon, PencilIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { FormValues, formSchema } from '@/app/lib/schemas';
import ContactField from './contact-field';
import OpeningHoursArray from './openinghours-array';

type Props = {
    initialValues: FormValues | undefined,
    onSubmit: (data: FormValues) => Promise<any>;
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

    return (
        <div className="border-stone-400 rounded-xl border-solid border-2 p-2 min-w-80 bg-purple-50 m-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-2">
                    {/* General */}
                    <div className="form-card">
                        <div className="form-card-title"><BuildingStorefrontIcon className="h-6 w-6"></BuildingStorefrontIcon>General</div>

                        <div className="flex flex-col md:flex-row gap-x-20">
                            {/* Name */}
                            <div className="mb-4 w-full md:w-96">
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

                    </div>

                    {/* Address */}
                    <div className="form-card">
                        <div className="form-card-title"><MapPinIcon className="h-6 w-6"></MapPinIcon>Address</div>
                        {/* <AddressField register={register} errors={errors.address} ></AddressField> */}
                        <div className="relative">
                            <input
                                {...register("address")}
                                type="text"
                                placeholder="Enter address"
                                className="form-field"
                            />
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="form-card">
                        <div className="form-card-title"><PhoneIcon className="h-6 w-6"></PhoneIcon>Contact info</div>
                        <ContactField register={register} errors={errors.contact} ></ContactField>
                    </div>

                    {/* Tables */}
                    <div className="form-card flex flex-col">
                        <div className="form-card-title"><Image className="h-6 w-6" src="/table.svg" width={24} height={24} alt="table"></Image>Preferred tables</div>
                        <TableArray control={control} register={register} errors={errors} ></TableArray>
                    </div>

                    {/* Opening hours */}
                    <div className="form-card">
                        <div className="form-card-title"><ClockIcon className="h-6 w-6"></ClockIcon>Opening hours</div>
                        <OpeningHoursArray control={control} register={register} errors={errors} ></OpeningHoursArray>
                    </div>

                    {/* Photos */}
                    {/* <div className="form-card">
                        <div className="form-card-title"><PhotoIcon className="h-6 w-6"></PhotoIcon>Photos</div>
                    </div> */}

                    {/* Remarks */}
                    <div className="form-card">
                        <div className="form-card-title"><PencilIcon className="h-6 w-6"></PencilIcon>Remarks</div>
                        <textarea
                            {...register("remarks")}
                            placeholder=""
                            className="form-field-textarea w-full"
                            rows={3}
                        />
                    </div>
                </div>
                <div className="button-group">
                    <Link href="/dashboard" className="button-cancel" >
                        <XMarkIcon className="h-6 w-6"></XMarkIcon>
                    </Link>
                    <Button type="submit" className="button-submit" ><CheckIcon className="h-6 w-6"></CheckIcon></Button>
                </div>
            </form>
        </div>
    );
} 

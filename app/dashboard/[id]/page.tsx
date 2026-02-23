import { getRestaurant } from '@/app/lib/queries';
import CopyButton from '@/app/ui/copy-button';
import Breadcrumbs from '@/app/ui/breadcrumb';
import Link from 'next/link';
import Image from "next/image";
import Rating from '@/app/ui/rating';
import { XMarkIcon, PencilIcon, ClockIcon, PhotoIcon, PhoneIcon, MapPinIcon, EnvelopeIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const data = await getRestaurant(id);
    const days: string[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']; 
    
    const googleMaps = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${data.address}` 

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Restaurants', href: '/dashboard' },
                    {
                        label: data.name,
                        href: `/dashboard/${id}`,
                        active: true,
                    },
                ]}
            />

            <div className="flex flex-col border-stone-400 rounded-xl border-solid border-2 p-2 min-w-80 bg-purple-50 m-4 h-full">
                <div className="grid grid-cols-2 mx-4 mb-2 text-4xl">
                    <b>{data.name}</b>
                    <div className="flex flex-row px-1 gap-x-0 justify-end items-center h-full">
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

                        </div>
                        <Rating count={3} iconSize={15} value={data.level} readOnly={true} />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="flex flex-col gap-y-2 mx-6 mb-6">
                        <div className="flex flex-row items-center gap-x-2"><MapPinIcon className="h-5 w-5"></MapPinIcon>{data.address}</div>
                        <div className="flex flex-row items-center gap-x-2"><PhoneIcon className="h-5 w-5"></PhoneIcon> {data.contact?.phone} <div className={`${data.contact?.phone ? "block" : "hidden"} cursor-pointer`} ><CopyButton value={data.contact?.phone}></CopyButton></div></div>
                        <div className="flex flex-row items-center gap-x-2"><EnvelopeIcon className="h-5 w-5"></EnvelopeIcon>{data.contact?.email}</div>
                        <div className="flex flex-row items-center gap-x-2"><GlobeAltIcon className="h-5 w-5"></GlobeAltIcon><Link className="text-blue-600 hover:underline flex flex-row gap-x-1" href={data.contact?.website ?? ""} target='_blank'>{data.contact?.website} <ArrowTopRightOnSquareIcon className={`${!data.contact?.website ? "hidden" : "block"} text-blue-600 w-4 h-4 -top-1 relative`}/></Link></div>
                        <div className="flex flex-row items-start gap-x-2"><Image className="h-5 w-5" src="/table.svg" width={24} height={24} alt="table"></Image>
                            <ul>
                                {data.tables?.map((t, index) => (
                                    <li key={index} className="flex flex-row">{t.description}  <Image alt='terrace'
                                        src='/terrace.svg'
                                        width={20}
                                        height={20}
                                        className={`ml-2 ${t.isOutside ? 'block' : 'invisible'}`}></Image> </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-row items-start gap-x-2"><ClockIcon className="h-5 w-5"></ClockIcon>
                            <ul>
                                {data.openingHours?.map((t, index) => (
                                    <li key={index} className={`flex flex-row ${(t.from && t.to) ? 'block' : 'hidden'}`}>
                                        <label className="w-6">
                                            {days[index]}
                                        </label>
                                        <div className="ml-2 flex flex-row items-center gap-x-2">{t.from ?? "00:00"} <ArrowLongRightIcon className="w-4 h-4"/> {t.to ?? "00:00"}</div></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-row items-start gap-x-2"><PencilIcon className="h-5 w-5"></PencilIcon>{data.remarks}</div>

                    </div>
                    <div className="md:m-10 m-1">
                        <iframe
                            className={`${data.address ? "block" : "hidden"} w-full h-full`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={googleMaps}>
                        </iframe>
                    </div>
                </div>
                <div className="button-group">
                    <Link href="/dashboard" className="button-cancel" >
                        <XMarkIcon className="h-6 w-6"></XMarkIcon>
                    </Link>
                    <Link href={`/dashboard/${id}/edit`} className="button-edit" >
                        <PencilIcon className="h-6 w-6"></PencilIcon>
                    </Link>
                </div>

            </div>
        </main>
    );
}
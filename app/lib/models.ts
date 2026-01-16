export type CardData = {
    id: string;
    name: string;
    level: number;
    hasParking: boolean;
    hasTerrace: boolean;
}

export type Restaurant = {
    id: string;
    name: string;
    level: number;
    hasParking: boolean;
    hasTerrace: boolean;
    openingHours: [OpeningHour],
    address: Address,
    contact: ContactInfo,
    tables: [TableInfo],
}


export type TableInfo = {
    number: number,
    info?: string | null | undefined,
    isOutside: boolean

}

export type OpeningHour = {
    day: number,
    from: string,
    to: string
}

export type Address = {
    city: string,
    street?: string | undefined | null,
    number?: string | undefined | null
}

export type ContactInfo = {
    email?: string | undefined | null,
    website?: string | undefined | null,
    phone?: string | undefined | null
}

export type Card = {
    id: string;
    name: string;
    level: number;
    hasParking: boolean;
    hasTerrace: boolean;
    isOpenNow: boolean;
}
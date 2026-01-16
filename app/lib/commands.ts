"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Restaurant, TableInfo, OpeningHour, Address, ContactInfo } from "@/app/lib/models";
import { DocumentStore, IDocumentSession } from "ravendb";
import { randomUUID } from 'crypto';
import { formSchema, FormValues } from "@/app/lib/schemas";
import * as dotenv from 'dotenv';

dotenv.config();
const DB_NAME: string = process.env.DB_NAME ?? '';
const DB_HOST: string = process.env.DB_HOST ?? '';

export type State = {
  errors: {
    name?: string[];
    level?: string[];
    hasParking?: string[];
    hasTerrace?: string[];
    address: {
      street?: string[];
      number?: string[];
      city?: string[];
    },
    contact: {
      email?: string[];
      phone?: string[];
      website?: string[];
    }
    tables?: string[][];
    // openingHours?:string[][];
  };
  message?: string | null | undefined;
  values: FormValues
  // values: {
  //   name?: string;
  //   level?: number;
  //   hasParking?: string;
  //   hasTerrace?: string;
  //   address: Address,
  //   contact:  ContactInfo,
  //   tables?: TableInfo[];
  //   openingHours?: OpeningHour[],
  // };
};

const CreateRestaurant = formSchema.omit({});
const UpdateRestaurant = formSchema.omit({});

export async function createRestaurant(formData: any) {
  let validatedFields: any;
  const parsed = formSchema.parse(formData)
  console.log(formData)
  console.log(parsed)

  const store = new DocumentStore(DB_HOST, DB_NAME);
  store.initialize();
  const session = store.openSession();

  try {
    validatedFields = CreateRestaurant.safeParse({ ...formData });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create restaurant.",
        values: validatedFields.data
      };
    }

    // save it to RavenDb 


    const item: Restaurant = {
      id: randomUUID().replace(/-/g, ''),
      ...validatedFields.data
    };

    await session.store(item, `restaurants/${item.id}`);
    await session.saveChanges();

  } catch (error) {
    if (error instanceof Error && error.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return {
      errors: {},
      message:
        "An unexpected error occurred while creating the restaurant. Please try again later.",
      values: formData
    };
  } finally {
    if (session) session.dispose();
    if (store) store.dispose();

    if (validatedFields?.success) {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  }
}

export async function updateRestaurant(id: string, formData: FormValues) {
  let validatedFields: any;

  const store = new DocumentStore(DB_HOST, DB_NAME);
  store.initialize();
  const session = store.openSession();

  try {
    validatedFields = UpdateRestaurant.safeParse({ ...formData });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update restaurant.",
        values: validatedFields.data
      };
    }

    // save it to RavenDb  
    let item: Restaurant | null = await session.load<Restaurant>(`restaurants/${id}`);
    if (!item) {
      throw new Error("Item not found")
    }

    item = { ...item, ...validatedFields.data }

    console.log(item)

    await session.saveChanges();

  } catch (error) {
    if (error instanceof Error && error.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return {
      errors: {},
      message:
        "An unexpected error occurred while updating the restaurant. Please try again later.",
      values: formData
    };
  } finally {
    if (session) session.dispose();
    if (store) store.dispose();

    if (validatedFields?.success) {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  }
}

export async function deleteRestaurant(id: string) {
  const store = new DocumentStore(DB_HOST, DB_NAME);
  store.initialize();
  const session = store.openSession();

  try {
    await session.delete<Restaurant>(`restaurants/${id}`);
    await session.saveChanges();

  } catch (error) {
    if (error instanceof Error && error.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return {
      errors: {},
      message:
        "An unexpected error occurred while removing the restaurant. Please try again later.",
    };
  } finally {
    if (session) session.dispose();
    if (store) store.dispose();

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
}
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Restaurant, User } from "@/app/lib/models";
import { DocumentStore, IDocumentSession } from "ravendb";
import { randomUUID } from "crypto";
import { formSchema, FormValues } from "@/app/lib/schemas"; 
import fs from "fs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import * as bcrypt from "bcrypt";
import { buildTimeRanges, formatPhoneNumber } from "./maps";
import { store } from "@/app/lib/ravendb"
 

export type State = {
  errors: {
    name?: string[];
    level?: string[];
    hasParking?: string[];
    hasTerrace?: string[];
    address: string[];
    contact: {
      email?: string[];
      phone?: string[];
      website?: string[];
    };
    // tables?: string[][];
    // openingHours?:string[][];
  };
  message?: string | null | undefined;
  values: FormValues;
};

const CreateRestaurant = formSchema.omit({});
const UpdateRestaurant = formSchema.omit({});

function setCollection(
  session: IDocumentSession,
  item: any,
  collectionName: string,
): void {
  session.advanced.getMetadataFor(item)["@collection"] = collectionName;
}

export async function createRestaurant(formData: FormValues) {
  let validatedFields: any; 
   
  const session = store.openSession();

  try {
    validatedFields = CreateRestaurant.safeParse({ ...formData });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create restaurant.",
        values: validatedFields.data,
      };
    }

    // save it to RavenDb
    const item: Restaurant = {
      id: randomUUID().replace(/-/g, ""),
      openingRange: buildTimeRanges(validatedFields.data.openingHours),
      ...validatedFields.data,
    };

    await session.store(item, `restaurants/${item.id}`);
    setCollection(session, item, "restaurants");
    await session.saveChanges();
  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      errors: {},
      message:
        "An unexpected error occurred while creating the restaurant. Please try again later.",
      values: formData,
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
 
  const session = store.openSession();

  try {
    validatedFields = UpdateRestaurant.safeParse({ ...formData });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update restaurant.",
        values: validatedFields.data,
      };
    }

    // save it to RavenDb
    let item: Restaurant | null = await session.load<Restaurant>(
      `restaurants/${id}`,
    );

    if (!item) {
      throw new Error("Item not found");
    }

    item.openingHours = validatedFields.data.openingHours;
    item.openingRange = buildTimeRanges(validatedFields.data.openingHours);
    item.tables = validatedFields.data.tables;
    item.contact = validatedFields.data.contact;
    item = {
      ...item,
      ...validatedFields.data,
      openingRange: item.openingRange,
    };

    await session.saveChanges();
  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      errors: {},
      message:
        "An unexpected error occurred while updating the restaurant. Please try again later.",
      values: formData,
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

export async function addPhoto(id: string, file: any) {
   
  const session = store.openSession();

  // 2️⃣ Attach the image
  const fileStream = fs.createReadStream(file.filepath);
  session.advanced.attachments.store(
    `restaurants/${id}`,
    file.originalFilename,
    fileStream,
    file.mimetype,
  );

  await session.saveChanges();
  session.dispose();

  //   const imageStream = fs.createReadStream("./profile.jpg");
  //     session.advanced.attachments.store(
  //         id,        // document ID
  //         "profile.jpg",     // attachment name
  //         imageStream,       // binary stream
  //         "image/jpeg"       // MIME type
  //     );
}

export async function deleteRestaurant(id: string) {
  
  const session = store.openSession();

  try {
    await session.delete<Restaurant>(`restaurants/${id}`);
    await session.saveChanges();
  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
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

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  
  const session = store.openSession();

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const id: string = randomUUID().replace(/-/g, "");
  const user: User = {
    id,
    email: email.toLowerCase(),
    name,
    password: hash,
  };

  await session.store(user, `users/${id}`);
  setCollection(session, user, "users");
  await session.saveChanges();
}

export async function authenticate(formData: FormData): Promise<any> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

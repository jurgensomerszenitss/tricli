import { DocumentStore } from "ravendb";
import { FormValues } from "./schemas";
import * as dotenv from 'dotenv';
import { Restaurant } from "./models";

dotenv.config();
const DB_NAME: string = process.env.DB_NAME ?? '';
const DB_HOST: string = process.env.DB_HOST ?? '';

export async function getDashboard(filter: any): Promise<any> {
  const store = new DocumentStore(DB_HOST, DB_NAME);
  let session: any;
  try {
    await store.initialize();
    session = store.openSession();

    var query = session.query("restaurants");

    if (filter) {
      if (filter.query)
        query = query.whereRegex('name', `^${filter.query}.*`, 'i');
      if (filter.hasParking == "true")
        query = query.whereEquals("hasParking", true);
      if (filter.hasTerrace == "true")
        query = query.whereEquals("hasTerrace", true);
    }

    const all = await query.orderBy("name").all();

    var cards = all.map((r: any) => ({ id: r["@metadata"]["@id"].split("/")[1], name: r.name, level: r.level, hasParking: r.hasParking, hasTerrace: r.hasTerrace }));

    return { cards };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch restaurant data.');
  } finally {
    if (session) session.dispose();
    if (store) store.dispose();
  }
}

export async function getRestaurant(id: string): Promise<FormValues> {
  const store = new DocumentStore(DB_HOST, DB_NAME);
  let session: any;
  try {
    await store.initialize();
    session = store.openSession();

    const item: Restaurant = await session.query("restaurants").whereEquals('id', `restaurants/${id}`).firstOrNull();

    const fv: FormValues = {
      name: item.name,
      level: item.level,
      hasParking: item.hasParking,
      hasTerrace: item.hasTerrace,
      address: item.address,
      contact: item.contact,
      tables: item.tables
    }

    return fv;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch restaurant data.');
  } finally {
    if (session) session.dispose();
    if (store) store.dispose();
  }
}
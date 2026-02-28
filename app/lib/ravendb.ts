import {
    DocumentStore,
    DatabaseRecord,
    CreateDatabaseOperation,
    GetDatabaseRecordOperation
} from "ravendb";
import * as dotenv from "dotenv";

dotenv.config();
const DB_NAME: string = process.env.DB_NAME ?? "";
const DB_HOST: string = process.env.DB_HOST ?? "";
 
export const store = new DocumentStore(DB_HOST,DB_NAME)
store.initialize(); 
 
export async function ensureDatabaseExists() { 
    try {
        // Try to get database info
        await store.maintenance.server.send(new GetDatabaseRecordOperation(DB_NAME));
    } catch (err:any) {
        // If database doesn't exist, create it
        if (err.message.includes("DatabaseDoesNotExistException")) {
            const databaseRecord: DatabaseRecord = {
                databaseName: DB_NAME
            };
            await store.maintenance.server.send(
                new CreateDatabaseOperation(databaseRecord)
            );
            console.log(`Database "${DB_NAME}" created.`);
        } else {
            throw err;
        }
    }
}

// if(DB_HOST && DB_HOST != "")  { 
//     ensureDatabaseExists(DB_NAME).catch(console.error);
// }
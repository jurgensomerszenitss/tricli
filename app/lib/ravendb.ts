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

// 1. Initialize the DocumentStore
export const store = new DocumentStore(DB_HOST,DB_NAME)
store.initialize(); 

// 2. Function to ensure database exists
async function ensureDatabaseExists(dbName: string) {
    if(!DB_HOST || DB_HOST == "") return
    
    try {
        // Try to get database info
        await store.maintenance.server.send(new GetDatabaseRecordOperation(dbName));
    } catch (err:any) {
        // If database doesn't exist, create it
        if (err.message.includes("DatabaseDoesNotExistException")) {
            const databaseRecord: DatabaseRecord = {
                databaseName: dbName
            };
            await store.maintenance.server.send(
                new CreateDatabaseOperation(databaseRecord)
            );
            console.log(`Database "${dbName}" created.`);
        } else {
            throw err;
        }
    }
}

// 3. Use the function
ensureDatabaseExists(DB_NAME).catch(console.error);
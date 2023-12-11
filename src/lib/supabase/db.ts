import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('Cannot find database url');
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDB = async () => {
    try {
        console.log("😶 Migrating Client...");
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log("🎉 Migrated Client...");
    } catch (error) {
        console.log("🤯 Error Occured while Migrating client...");
    }
};
migrateDB();

export default db;
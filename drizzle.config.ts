import {defineConfig} from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({path: '.env'});

export default defineConfig({
    dialect: "postgresql",
    out: "./src/db/migrations",
    schema:"./src/db/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
})

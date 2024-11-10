
import { config } from  "dotenv"


config({ path: ".env.local" })



import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    
    },
    verbose: true,
    strict: true
});
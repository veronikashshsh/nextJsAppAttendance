import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: './drizzle',
    schema: "./utilis/schema.js",
    dialect: "mysql",
    dbCredentials: {
        host: "srv1757.hstgr.io",
        user: "u842076577_buildapp",
        database: "u842076577_buildapp",
        password: 'builddApp23452',
        port: 3306
    }
});
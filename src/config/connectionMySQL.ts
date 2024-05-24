import { createPool } from "mysql2/promise"
import "dotenv/config"

export const pool = createPool({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASS,
	database: process.env.DBNAME,
	port: Number(process.env.DBPORT),
})

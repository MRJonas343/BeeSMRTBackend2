import express from "express"
import cors from "cors"
import "dotenv/config"
import { router } from "./routes/index"
import fileUpload from "express-fileupload"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
	fileUpload({
		useTempFiles: false,
		limits: { fileSize: 5 * 1024 * 1024 },
	}),
)
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	}),
)
app.use(router)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

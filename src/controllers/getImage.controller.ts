import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

//* R2 configuration
const R2 = new S3Client({
	region: "auto",
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
})

const getImageController = async (req: Request, res: Response) => {
	const getParams = {
		Bucket: process.env.R2_BUCKET_NAME_IMAGES || "",
		Key: "TestMemoryGame1.webp",
	}

	try {
		const command = new GetObjectCommand(getParams)
		const url = await getSignedUrl(R2, command, { expiresIn: 3600 })
		console.log(url)

		res.send("getImageController")
	} catch (error) {
		console.error("Error getting file:", error)
	}
}

export { getImageController }

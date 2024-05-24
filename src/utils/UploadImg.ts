import "dotenv/config"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

//* R2 configuration
const R2 = new S3Client({
	region: "auto",
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
})

const UploadImg = async (file: Express.Multer.File) => {
	const uploadParams = {
		Bucket: process.env.R2_BUCKET_NAME_IMAGES || "",
		Key: file.originalname, // Nombre del archivo en el bucket
		Body: file.buffer, // Contenido del archivo binarios
		ContentType: file.mimetype, // Tipo de contenido del archivo
	}

	try {
		await R2.send(new PutObjectCommand(uploadParams))
		return "Successfull"
	} catch (error) {
		console.error("Error uploading file:", error)
		return "Error"
	}
}

export { UploadImg }

import "dotenv/config"
import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3"
import { UploadedFile } from "express-fileupload"
import { pool } from "../config/connectionMySQL"
import { RowDataPacket, ResultSetHeader } from "mysql2"

//* R2 configuration
const R2 = new S3Client({
	region: "auto",
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
})

const UploadImg = async (file: UploadedFile, email: string) => {
	try {
		//*Params to upload the image
		const extensionFile: { [key: string]: string } = {
			"image/jpeg": "jpeg",
			"image/png": "png",
			"image/jpg": "jpg",
			"image/webp": "webp",
		}

		const uploadParams = {
			Bucket: process.env.R2_BUCKET_NAME_AVATARS || "",
			Key: `${email}.${extensionFile[file.mimetype]}`, //? un nombre unico puede ser el email del usuario, pero necesito la extension del archivo
			Body: file.data, // Contenido del archivo binarios
			ContentType: file.mimetype, // Tipo de contenido del archivo
		}

		//*chek if the user has an image
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT profileImg from normalUserInfo where email = ?",
			[email],
		)

		if (result[0].profileImg === null) {
			await R2.send(new PutObjectCommand(uploadParams))
			const baseURL = "https://pub-241a841ae4ea425fa274a2a6b42464d9.r2.dev"
			const url = `${baseURL}/${uploadParams.Key}`
			return url
		}

		if (result[0].profileImg !== null) {
			const userImage = result[0].profileImg
			const extensionIndex = userImage.lastIndexOf(".")
			const extension = userImage.slice(extensionIndex)
			const deleteParams = {
				Bucket: process.env.R2_BUCKET_NAME_AVATARS || "",
				Key: `${email}${extension}`,
			}
			//*Delete the image
			await R2.send(new DeleteObjectCommand(deleteParams))
			//*Upload the new image
			await R2.send(new PutObjectCommand(uploadParams))
			const baseURL = "https://pub-241a841ae4ea425fa274a2a6b42464d9.r2.dev"
			const url = `${baseURL}/${uploadParams.Key}`
			return url
		}

		return "Error"
	} catch (error) {
		console.error("Error uploading file:", error)
		return "Error"
	}
}

export { UploadImg }

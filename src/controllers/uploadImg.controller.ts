import { Request, Response } from "express"
import { UploadImg } from "../utils/UploadImg"

const uploadImgController = async (req: Request, res: Response) => {
	if (!req.file) {
		return res.status(400).json({ message: "No file uploaded" })
	}

	const results = await UploadImg(req.file)

	if (results === "Error") {
		return res.status(500).json({ message: "Error uploading file" })
	}

	res.status(200).json({ message: "File uploaded successfully" })
}

export { uploadImgController }

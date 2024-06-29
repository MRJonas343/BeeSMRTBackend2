import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import { UploadImg } from "../utils/updateProfileImage"
import { updateUserData } from "../models/updateUserData.model"

const updateDataController = async (req: Request, res: Response) => {
	const dataToUpdate = {}

	if (req.body.fullName) {
		Object.assign(dataToUpdate, { fullName: req.body.fullName })
	}

	if (req.body.nickName) {
		Object.assign(dataToUpdate, { nickName: req.body.nickName })
	}

	if (req.body.englishLevel) {
		Object.assign(dataToUpdate, { englishLevel: req.body.englishLevel })
	}

	try {
		//*validate the file if exists
		if (req.files?.image) {
			if (Array.isArray(req.files.image)) {
				res.status(400)
				res.send({ Error: "Error: Only one file is allowed" })
				return
			}
			const file: UploadedFile = req.files?.image as UploadedFile
			if (file) {
				if (
					file.mimetype !== "image/jpeg" &&
					file.mimetype !== "image/png" &&
					file.mimetype !== "image/jpg" &&
					file.mimetype !== "image/webp"
				) {
					res.status(400)
					res.send("Error: Invalid file type")
					return
				}
				//*upload the image
				const imageURL = await UploadImg(file, String(req.headers.email))
				Object.assign(dataToUpdate, { profileImg: imageURL })
			}
		}

		//*update everything in the database
		const result = await updateUserData(String(req.headers.email), dataToUpdate)
		if (result === "Successfull") {
			res.json(dataToUpdate)
			return
		}

		res.status(400)
	} catch (e) {
		res.status(400)
		res.send("Error")
	}
}

export { updateDataController }

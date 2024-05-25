import { Request, Response, NextFunction } from "express"
import multer from "multer"

//* Multer configuration
const storage = multer.memoryStorage()

const multerUpload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback,
	) => {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/webp"
		) {
			cb(null, true)
		} else {
			console.log("File not supported")
			cb(null, false)
		}
	},
}).single("image")

const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	multerUpload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			console.log(err)
			res.status(400)
			res.send("A Multer error occurred when uploading.")
			return
		}

		if (err) {
			console.log(err)
			res.status(400)
			res.send("An unknown error occurred when uploading.")
			return
		}

		next()
	})
}
export { multerMiddleware }

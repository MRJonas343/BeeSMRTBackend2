import { Router } from "express"
import { readSync, readdirSync } from "node:fs"

const PATH_ROUTER = `${__dirname}`
const router = Router()

const clearFileName = (fileName: string) => {
	const file = fileName.split(".").shift()
	return file
}

readdirSync(PATH_ROUTER).filter((fileName) => {
	const cleanName = clearFileName(fileName)
	if (cleanName !== "index") {
		import(`./${cleanName}`).then((moduleRouter) => {
			router.use(`/${cleanName}`, moduleRouter.router)
		})
	}
})

export { router }

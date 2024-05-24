import { hash, compare } from "bcrypt"

const encrypt = async (plainPassword: string) => {
	const password = await hash(plainPassword, 8)
	return password
}

const verified = async (plainPassword: string, hashPassword: string) => {
	const isCorrect = await compare(plainPassword, hashPassword)
	return isCorrect
}

export { encrypt, verified }

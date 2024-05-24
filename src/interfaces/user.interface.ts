import { Auth } from "./aurth.interface"

export interface User extends Auth {
	name: string
	description: string
}

import z from "zod"
import { ROLES } from "../Models/UserModel"

// esses são para o PUT
export interface CreateUserInputDTO {
    // id: string,
    name: string,
    email: string,
    password: string,
    role?: ROLES
}

export interface CreateUserOutputDTO {
    message: string,
    token: string
}

export const createUserSchema = z.object({
    // id: z.string(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
    role: z.nativeEnum(ROLES).optional()
}).transform(data => data as CreateUserInputDTO)
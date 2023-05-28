import z from "zod"

// esses são para o PUT
export interface CreatePostInputDTO {
    creatorId: string,
    content: string
}

export interface CreatePostOutputDTO {
    message: string,
}

export const createPostSchema = z.object({
    creatorId: z.string(),
    content: z.string().min(3)
}).transform(data => data as CreatePostInputDTO)
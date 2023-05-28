import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../Errors/BaseError";
import { createPostSchema } from "../dtos/createPost.dto";
import { PostBusiness } from "../Business/PostBusiness";

export class PostController {
	constructor(private postBusiness: PostBusiness) { }

	public createPost = async (req: Request, res: Response): Promise<void> => {
		try {
			const input = createPostSchema.parse({
				creatorId: req.body.creatorId,
				content: req.body.content,
			});

			const output = await this.postBusiness.createPost(input);

			res.status(201).send(output);
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				res.status(400).send(error.issues[0].message);
			} else if (error instanceof BaseError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send("Erro inesperado");
			}
		}
	};

	public deletePost = async (req: Request, res: Response): Promise<void> => {
		try {
			const input = req.body

			const output = await this.postBusiness.deletePost(input);

			res.status(201).send(output);
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				res.status(400).send(error.issues[0].message);
			} else if (error instanceof BaseError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send("Erro inesperado");
			}
		}
	};

	public editPost = async (req: Request, res: Response): Promise<void> => {
		try {
			const input = req.body

			const output = await this.postBusiness.editPost(input);

			res.status(201).send(output);
			
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				res.status(400).send(error.issues[0].message);
			} else if (error instanceof BaseError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send("Erro inesperado");
			}
		}
	}
}

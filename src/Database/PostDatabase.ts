import { PostDB } from "../Models/PostModel";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
	public static TABELA_POSTS = "posts";

	public async findPostById(id: string) {
		const [post] = await BaseDatabase.connection(
			PostDatabase.TABELA_POSTS
		).where({ id });

		return post;
	}

	public async createPost(newPost: PostDB) {
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).insert(newPost)
	}

	public async deletePost(id: string) {
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).where({ id }).del()
	}

	public async editPost(input: any) {
		const { id, content } = input
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).where({ id }).update({ content })
	}

	public async findPostByCreatorId(creatorId: string) {
		const posts = await BaseDatabase.connection(
			PostDatabase.TABELA_POSTS)
			.where({ creatorId })
		return posts
	}

	public async findAllPosts() {
		const posts = await BaseDatabase.connection(PostDatabase.TABELA_POSTS)
		return posts
	}

	public async addLike(id: string){
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).increment('likes').where({ id })
	}

	public async addDislike(id: string){
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).increment('dislikes').where({ id })
	}

	public async removeLike(id: string){
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).decrement('likes').where({ id })
	}

	public async removeDislike(id: string){
		await BaseDatabase.connection(PostDatabase.TABELA_POSTS).decrement('dislikes').where({ id })
	}

}


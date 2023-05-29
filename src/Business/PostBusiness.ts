import { PostDatabase } from "../Database/PostDatabase";
import { AlreadyExistsError } from "../Errors/AlreadyExistsError";
import { NotFoundError } from "../Errors/NotFoundError";
import { Post } from "../Models/PostModel";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";
import {
    CreatePostInputDTO,
    CreatePostOutputDTO,
} from "../dtos/createPost.dto";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (
        input: CreatePostInputDTO
    ): Promise<CreatePostOutputDTO> => {
        const { creatorId, content } = input;
        const id = this.idGenerator.generate();

        const postAlreadyExists = await this.postDatabase.findPostById(id);
        if (postAlreadyExists) {
            throw new AlreadyExistsError();
        }

        const newPost = new Post(id, creatorId, content);
        const newPostDB = {
            id: newPost.getId(),
            creatorId: newPost.getCreatorId(),
            content: newPost.getContent(),
        };

        await this.postDatabase.createPost(newPostDB);

        const output: CreatePostOutputDTO = {
            message: "Postagem criada com sucesso",
        };

        return output;
    };

    public deletePost = async (input: any) => {

        const { id } = input

        const postToDelete = await this.postDatabase.findPostById(id);

        if (!postToDelete) {
            throw new NotFoundError
        }

        await this.postDatabase.deletePost(id)

        const output = {
            message: "Post deletado com sucesso"
        }

        return output
    }

    public editPost = async (input: any) => {
        const { id } = input

        const postToEdit = await this.postDatabase.findPostById(id);

        if (!postToEdit) {
            throw new NotFoundError
        }

        await this.postDatabase.editPost(input)

        const output = {
            message: "Post editado com sucesso"
        }

        return output
    }

    public getPostById = async (id: string) => {
        const post = await this.postDatabase.findPostById(id);

        if (!post) {
            throw new NotFoundError
        }

        const output = {
            message: "Post encontrado com sucesso",
            post
        }

        return output
    }

    public getPostByCreator = async (creatorId: string) => {
        const post = await this.postDatabase.findPostByCreatorId(creatorId);

        if (!post) {
            throw new NotFoundError
        }

        const output = {
            message: "Post encontrado com sucesso",
            post
        }

        return output
    }

    public getAllPosts = async () => {
        const posts = await this.postDatabase.findAllPosts()
        if (!posts) {
            throw new NotFoundError
        }

        const output = {
            message: "Post encontrado com sucesso",
            posts
        }

        return output
    }
}

import { LikesDatabase } from "../Database/LikesDatabase";
import { PostDatabase } from "../Database/PostDatabase";
import { UserDatabase } from "../Database/UserDatabase";
import { NotFoundError } from "../Errors/NotFoundError";

export class LikesBusiness {
    constructor(
        private likesDatabase: LikesDatabase, 
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase) {}

    public likeDislike = async (postId: string, userId: string, likeDislike: number) => {
        const post = await this.postDatabase.findPostById(postId);
        if (!post) {
            throw new NotFoundError
        }

        const user = await this.userDatabase.findUserById(userId)
        if (!user) {
            throw new NotFoundError
        }

        type likeDislikeDB = {
            post_id: string,
            user_id: string,
            like: number
        }
        const [interactionExists]: likeDislikeDB[] = await this.likesDatabase.findInteraction(postId, userId)
        // não teve interação
        if (!interactionExists) {
            // usuário deu like
            if (likeDislike === 1) {
                await this.likesDatabase.addLike(postId, userId)
                await this.postDatabase.addLike(postId)
            }
    
            // usuário deu dislike
            if (likeDislike === 0) {
                await this.likesDatabase.addDislike(postId, userId)
                await this.postDatabase.addDislike(postId)
            }
        }

        // já teve interação 
        if (interactionExists) {
            const likeStatus: number = interactionExists?.like
            // usuário deu like mas já tinha dado like
            if (likeDislike === 1 && likeStatus === 1) {
                // do nothing
            }
            // usuário deu like mas já tinha dado dislike
            else if (likeDislike === 1 && likeStatus === 0) {
                await this.likesDatabase.changeLike(postId, userId, likeDislike)
                await this.postDatabase.addLike(postId)
                await this.postDatabase.removeDislike(postId)
                // await this.likesDatabase.addLike(postId, userId)
                // await this.likesDatabase.removeDislike(postId, userId)
            }
            // usuário deu dislike mas já tinha dado like
            else if (likeDislike === 0 && likeStatus === 1) {
                await this.likesDatabase.changeLike(postId, userId, likeDislike)
                await this.postDatabase.addDislike(postId)
                await this.postDatabase.removeLike(postId)
                // await this.likesDatabase.addDislike(postId, userId)
                // await this.likesDatabase.removeLike(postId, userId)
            } 
            // usuário deu dislike mas já tinha dado dislike
            else {
                // do nothing
            }
        }

    }
}
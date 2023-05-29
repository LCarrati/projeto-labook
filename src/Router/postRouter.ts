import express from "express";
import { PostController } from "../Controller/PostController";
import { PostBusiness } from "../Business/PostBusiness";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";
import { PostDatabase } from "../Database/PostDatabase";

const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.post("/createpost", postController.createPost)
postRouter.delete("/deletepost", postController.deletePost)
postRouter.put("/editepost", postController.editPost)
postRouter.get("/getPosts", postController.getPosts)

export default postRouter
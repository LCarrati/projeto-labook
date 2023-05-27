import express from "express";
import { UserController } from "../Controller/UserController";
import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Database/UserDatabase";

const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase()
    )
)

userRouter.post("/signup", userController.signup);
// userRouter.get("/", userController.findUser);
// userRouter.put("/", userController.updateUsers);
// userRouter.delete("/", userController.deleteUsers);

export default userRouter;

// signup
// login

// get posts
// create post
// edit post
// delete post

// like / dislike post
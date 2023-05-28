import express from "express";
import { UserController } from "../Controller/UserController";
import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Database/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";

const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login)
// userRouter.get("/", userController.findUser);
// userRouter.put("/", userController.updateUsers);
// userRouter.delete("/", userController.deleteUsers);

export default userRouter;

// getUsers

// like / dislike post
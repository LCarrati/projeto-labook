import { Request, Response } from "express";
import { UserBusiness } from "../Business/UserBusiness";
import { BaseError } from "../Errors/BaseError";
import { createUserSchema } from "../dtos/createUser.dto";
import { ZodError } from "zod";
import { LoginOutputDTO, LoginSchema } from "../dtos/loginUser.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = createUserSchema.parse({
        // id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const output = await this.userBusiness.createUser(input);

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

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output: LoginOutputDTO = await this.userBusiness.loginUser(input);

      res.status(200).send(output);
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

  // public findUser = async (req: Request, res: Response): Promise<void> => {
  //     // colocar em try catch
  //     const q = req.query.q as string | undefined

  //     const result = await this.userBusiness.findUser(q)

  //     res.status(200).send(result)
  // };

  //   public updateUsers = async (req: Request, res: Response): Promise<void> => {
  //     await this.userBusiness.editUsers();
  //   };

  //   public deleteUsers = async (req: Request, res: Response): Promise<void> => {
  //     await this.userBusiness.deleteUsers();
  //   };
}

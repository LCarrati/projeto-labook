import { UserDatabase } from "../Database/UserDatabase";
import { AlreadyExistsError } from "../Errors/AlreadyExistsError";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import { User } from "../Models/UserModel";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager, TokenPayload } from "../Services/TokenManager";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../dtos/createUser.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/loginUser.dto";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  // regras para cadastrar um usuário
  public createUser = async (
    input: CreateUserInputDTO
  ): Promise<CreateUserOutputDTO> => {
    //ver a tipagem desse input e da saída da função (output)

    const { name, email, password, role } = input;

    const id = this.idGenerator.generate();

    const userAlreadyExists = await this.userDatabase.findUserById(id, email);
    if (userAlreadyExists) {
      throw new AlreadyExistsError();
    }

    const newUser = new User(id, name, email, password);
    const newUserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
    };

    await this.userDatabase.createUser(newUserDB);

    //modelagem do objeto (payload)
    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload);

    const output: CreateUserOutputDTO = {
      message: "Usuário registrado com sucesso",
      token
    };

    return output;
  };

  // regras para logar um usuário
  public loginUser = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userExists = await this.userDatabase.findUserByEmail(email);

    if (!userExists) {
      throw new NotFoundError("'email' não encontrado");
    }

    const user = new User(
      userExists.id,
      userExists.name,
      userExists.email,
      userExists.password,
      userExists.role
    );

    if (password !== user.getPassword()) {
      throw new BadRequestError("'password' incorreto");
    }

    const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
      }
  
      const token = this.tokenManager.createToken(payload)

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token,
    };

    return output;
  };

  // public findUser = async (q: string | undefined): Promise<User[]> => {

  //     const usersDB = await this.userDatabase.findUser(q)

  //     const users: User[] = usersDB.map((userDB) => new User(
  //         userDB.id,
  //         userDB.name,
  //         userDB.email,
  //         userDB.password,
  //         userDB.role
  //     ))

  //     return users

  // }

  public editUsers = async () => {};
  public deleteUsers = async () => {};
}

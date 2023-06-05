import { UserDatabase } from "../Database/UserDatabase";
import { AlreadyExistsError } from "../Errors/AlreadyExistsError";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import { USER_ROLES, User } from "../Models/UserModel";
import { HashManager } from "../Services/HashManager";
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
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  // regras para cadastrar um usuário
  public createUser = async (
    input: CreateUserInputDTO
  ): Promise<CreateUserOutputDTO> => {
    //ver a tipagem desse input e da saída da função (output)

    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const userIdAlreadyExists = await this.userDatabase.findUserById(id);
    if (userIdAlreadyExists) {
      throw new AlreadyExistsError();
    }
    const userEmailAlreadyExists = await this.userDatabase.findUserByEmail(email);
    if (userEmailAlreadyExists) {
      throw new AlreadyExistsError();
    }

    const hashedPassword = await this.hashManager.hash(password)

    const newUser = new User(id, name, email, hashedPassword);
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
    // console.log("email no userBusiness é " + email)

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

    const hashedPassword = user.getPassword()

    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

  if (!isPasswordCorrect) {
    throw new BadRequestError("e-mail e/ou senha inválido(s)")
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
      name: user.getName(),
      role: payload.role
    };

    return output;
  };

  public getAllUsers = async (token: string) => {

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError("token inválido")
    }
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("somente admins podem acessar esse recurso")
    }

    const userList = await this.userDatabase.getAllUsers()

    return userList
  }

  public findUserByName = async (q: string): Promise<User[]> => {

      const usersDB = await this.userDatabase.findUserByName(q)

      if (usersDB) {
        // const users: User[] = usersDB.map((userDB: any) => new User(
        //     userDB.id,
        //     userDB.name,
        //     userDB.email,
        //     userDB.role,
        //     userDB.created_at
        // ))
        return usersDB
      } else {
        throw new NotFoundError
      }
  }

  public editUsers = async () => {};
  public deleteUsers = async () => {};
}
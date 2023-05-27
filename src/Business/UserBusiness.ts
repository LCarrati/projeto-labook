import { UserDatabase } from "../Database/UserDatabase"
import { AlreadyExistsError } from "../Errors/AlreadyExistsError"
import { User } from "../Models/UserModel"
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/createUser.dto"

export class UserBusiness {
    constructor(private userDatabase: UserDatabase) { }

    // regras para cadastrar um usuário
    public createUser = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => { //ver a tipagem desse input e da saída da função (output)

        const { id, name, email, password, role } = input

        // fazer as validações das informações aqui usando DTO ou o q quer que seja

        const userAlreadyExists = await this.userDatabase.findUserById(id, email)
        if (userAlreadyExists) {
            throw new AlreadyExistsError()
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            role
        )
        const newUserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole()
        }

        await this.userDatabase.createUser(newUserDB)

        const output: CreateUserOutputDTO = {
            message: "Usuário registrado com sucesso",
            product: {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: newUser.getRole()
            }
        }

        return output
    }



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

    public editUsers = async () => { }
    public deleteUsers = async () => { }
}
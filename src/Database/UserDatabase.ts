import { UserDB } from "../Models/UserModel";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABELA_USUARIOS = "users";

    public async createUser(newUser: UserDB) { 
        await UserDatabase.connection(UserDatabase.TABELA_USUARIOS).insert(newUser)
    }

    public async findUserById(id: string, email: string) {
        const [user] = await BaseDatabase
            .connection(UserDatabase.TABELA_USUARIOS)
            .where({ id }).orWhere({ email })

        return user
    }

    public async findUserByEmail(email: string) {
        const [user] = await BaseDatabase
            .connection(UserDatabase.TABELA_USUARIOS)
            .where({ email })

        return user
    }
}
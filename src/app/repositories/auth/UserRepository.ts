import User from "@src/app/models/auth/User";
import BaseUserRepository from "@src/core/domains/Auth/repository/BaseUserRepository";

export default class UserRepository extends BaseUserRepository<User>
{
    constructor() {
        super('users', User)
    }
}
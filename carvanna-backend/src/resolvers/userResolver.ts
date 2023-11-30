import { Mutation, Query, Resolver, Arg } from "type-graphql";
import createUserHandler from "../handlers/userHandlers/createUserHandler";
import logInHandler from "../handlers/authHandlers/logInHandler";
import { User } from "../entities/User";


@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hello World!';
    }

    @Mutation(() => String)
    createUser(
        @Arg("username", () => String) username: string,
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Arg("userType", () => String) userType: string
    ): Promise<string> {
        return createUserHandler(username, email, password, userType);
    }

    @Mutation(() => User)
    logInUser(
        @Arg("username", () => String) username: string,
        @Arg("password", () => String) password: string
    ): Promise<User> {
        return logInHandler(username, password);
    }
}

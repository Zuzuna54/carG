import { Mutation, Query, Resolver, Arg } from "type-graphql";
import createUserHandler from "../handlers/userHandlers/createUserHandler";

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
    ) {
        return createUserHandler(username, email, password, userType) as Promise<string>;
    }

    @Mutation(() => String)
    logInUser(
        @Arg("username", () => String) username: string,
        @Arg("password", () => String) password: string
    ) {
        return `Log in user ${username} with password ${password}`;
    }

}
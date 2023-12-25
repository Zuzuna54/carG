import { Mutation, Query, Resolver, Arg, Ctx } from "type-graphql";
import createComanyAdmin from "../handlers/userHandlers/createUserHandler";
import logInHandler from "../handlers/authHandlers/logInHandler";
import refreshAcessTokenHandler from "../handlers/authHandlers/refreshAcessTokenHandler";
import { User } from "../entities/User";
import { GenericReturn } from "../entities/genericReturn";
import { Context } from "../contextInterface/context";

@Resolver()
export class UserResolver {

    /**
     * Query resolver to return a greeting.
     * @returns A greeting.
     */
    @Query(() => String)
    hello() {

        return 'Hello World!';

    }

    /**
     * Mutation resolver to create a new user.
     * @param username - The username of the new user.
     * @param email - The email of the new user.
     * @param password - The password of the new user.
     * @param userType - The type of the new user.
     * @returns A message indicating the success of the user creation.
     */
    @Mutation(() => GenericReturn)
    createUser(
        @Arg("username", () => String) username: string,
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Arg("userType", () => String) userType: string,
        @Arg("companyId", () => String) companyId: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createComanyAdmin(username, email, password, userType, companyId, jwtToken);
    }

    /**
     * Mutation resolver to log in a user.
     * @param username - The username of the user logging in.
     * @param password - The password of the user logging in.
     * @returns The user object if login is successful.
     */
    @Mutation(() => User)
    logInUser(
        @Arg("username", () => String) username: string,
        @Arg("password", () => String) password: string,
        @Ctx() context: Context
    ): Promise<User> {

        return logInHandler(username, password, context);

    }

    /**
     * Mutation resolver to refresh the access token.
     * @param refreshToken - The refresh token.
     * @returns The new access token.
     */
    @Mutation(() => GenericReturn)
    refreshAccessToken(
        @Arg("refreshToken", () => String) refreshToken: string
    ): Promise<GenericReturn> {

        return refreshAcessTokenHandler(refreshToken);

    }

}

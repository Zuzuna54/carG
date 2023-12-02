import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import createLocationHandler from "../handlers/locationHandlers/createLocationHandler";
import { Context } from "../contextInterface/context";
import { GenericReturn } from "../entities/genericReturn";

@Resolver()
export class LocationResolver {

    /**
     * Mutation resolver to create a new user.
     * @param username - The username of the new user.
     * @param email - The email of the new user.
     * @param password - The password of the new user.
     * @param userType - The type of the new user.
     * @returns A message indicating the success of the user creation.
     */

    @Mutation(() => GenericReturn)
    createLocation(
        @Arg("name", () => String) name: string,
        @Arg("stateId", () => String) stateId: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createLocationHandler(name, stateId, jwtToken);

    }
}
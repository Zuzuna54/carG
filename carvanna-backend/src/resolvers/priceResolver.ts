import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import createPrice from "../handlers/priceHandlers/createPriceHandler";
import { Context } from "../contextInterface/context";
import { GenericReturn } from "../entities/genericReturn";

@Resolver()
export class PriceResolver {

    /**
     * Mutation resolver to create a new user.
     * @param username - The username of the new user.
     * @param email - The email of the new user.
     * @param password - The password of the new user.
     * @param userType - The type of the new user.
     * @returns A message indicating the success of the user creation.
     */

    @Mutation(() => GenericReturn)
    createPrice(
        @Arg("cost", () => Number) cost: number,
        @Arg("locationId", () => String) locationId: string,
        @Arg("companyId", () => String) companyId: string,
        @Arg("description", () => String) description: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createPrice(cost, locationId, companyId, description, jwtToken);

    }
}
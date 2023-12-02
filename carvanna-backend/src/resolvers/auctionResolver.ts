import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
// import { Auction } from "../entities/Auction";
import { Context } from "../contextInterface/context";
import createAuctionHandler from "../handlers/auctionHandlers/createAuctionHandler";
import { GenericReturn } from "../entities/genericReturn";

@Resolver()
export class AuctionResolver {

    /**
     * Mutation resolver to create a new company.
     * @param name 
     * @param description 
     * @param address 
     * @param phone 
     * @param email 
     * @param context 
     * @returns 
     */
    @Mutation(() => GenericReturn)
    createAuction(
        @Arg("name", () => String) name: string,
        @Arg("description", () => String) description: string,
        @Arg("address", () => String) address: string,
        @Arg("phone", () => String) phone: string,
        @Arg("email", () => String) email: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createAuctionHandler(name, description, address, phone, email, jwtToken);

    }

}
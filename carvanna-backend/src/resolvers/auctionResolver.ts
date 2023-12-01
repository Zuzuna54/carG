import { Mutation, Query, Resolver, Arg, Ctx } from "type-graphql";
import { Auction } from "../entities/Auction";
import { Context } from "../contextInterface/context";
import createCompanyHandler from "../handlers/companyHandlers/createCompanyHandler";


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
    @Mutation(() => String)
    createAuction(
        @Arg("name", () => String) name: string,
        @Arg("description", () => String) description: string,
        @Arg("address", () => String) address: string,
        @Arg("phone", () => String) phone: string,
        @Arg("email", () => String) email: string,
        @Ctx() context: Context
    ): Promise<string> {
        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        console.log(`jwtToken: ${jwtToken}`)
        return createCompanyHandler(name, description, address, phone, email, jwtToken);
    }

}
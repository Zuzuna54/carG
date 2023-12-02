import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import createCompanyHandler from "../handlers/companyHandlers/createCompanyHandler";
// import { Company } from "../entities/Compnay";
import { Context } from "../contextInterface/context";


@Resolver()
export class CompanyResolver {


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
    createCompany(
        @Arg("name", () => String) name: string,
        @Arg("description", () => String) description: string,
        @Arg("address", () => String) address: string,
        @Arg("phone", () => String) phone: string,
        @Arg("email", () => String) email: string,
        @Ctx() context: Context
    ): Promise<string> {
        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createCompanyHandler(name, description, address, phone, email, jwtToken);
    }

}
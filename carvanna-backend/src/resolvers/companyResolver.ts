import { Mutation, Resolver, Arg, Ctx, Query } from "type-graphql";
import createCompanyHandler from "../handlers/companyHandlers/createCompanyHandler";
import getCompaniesListHandler from "../handlers/companyHandlers/getCompaniesList";
// import { Company } from "../entities/Compnay";
import { Context } from "../contextInterface/context";
import { GenericReturn } from "../entities/genericReturn";


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
    @Mutation(() => GenericReturn)
    createCompany(
        @Arg("name", () => String) name: string,
        @Arg("description", () => String) description: string,
        @Arg("address", () => String) address: string,
        @Arg("phone", () => String) phone: string,
        @Arg("email", () => String) email: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createCompanyHandler(name, description, address, phone, email, jwtToken);

    }

    /**
     * Mutation resolver to get the companies list.
     * @param context 
     * @returns 
     */
    @Query(() => GenericReturn)
    getCompaniesList(
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return getCompaniesListHandler(jwtToken);

    }

}

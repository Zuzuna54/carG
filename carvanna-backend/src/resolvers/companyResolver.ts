import { Mutation, Resolver, Arg, Ctx, Query } from "type-graphql";
import createCompanyHandler from "../handlers/companyHandlers/createCompanyHandler";
import getCompaniesListHandler from "../handlers/companyHandlers/getCompaniesList";
import updateCompanyHandler from "../handlers/companyHandlers/updateCompanyHandler";
import getCompanyHandler from "../handlers/companyHandlers/getCompany";
import deleteCompanyHandler from "../handlers/companyHandlers/deleteCompanyHandler";
import diableCompanuHandler from "../handlers/companyHandlers/disableCompanyHandler";
import enableCompanyHandler from "../handlers/companyHandlers/enableCompanyHandler";
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
     * Mutation resolver to update a company.
     * @param id 
     * @param name 
     * @param description 
     * @param address 
     * @param phone 
     * @param email 
     * @param status 
     * @param context 
     * @returns 
     */
    @Mutation(() => GenericReturn)
    updateCompany(
        @Arg("id", () => String) id: string,
        @Arg("name", () => String) name: string,
        @Arg("description", () => String) description: string,
        @Arg("address", () => String) address: string,
        @Arg("phone", () => String) phone: string,
        @Arg("email", () => String) email: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return updateCompanyHandler(id, name, description, address, phone, email, jwtToken);

    }

    /**
     * Mutation resolver to get a company.
     * @param id 
     * @param context 
     * @returns 
     */
    @Query(() => GenericReturn)
    getCompany(
        @Arg("id", () => String) id: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return getCompanyHandler(id, jwtToken);

    }

    /**
     * Mutation resolver to delete a company.
     * @param id 
     * @param context 
     * @returns 
     */

    @Mutation(() => GenericReturn)
    deleteCompany(
        @Arg("id", () => String) id: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return deleteCompanyHandler(id, jwtToken);

    }

    /**
     * Mutation resolver to disable a company.
     * @param id 
     * @param context 
     * @returns 
     */
    @Mutation(() => GenericReturn)
    disableCompany(
        @Arg("id", () => String) id: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return diableCompanuHandler(id, jwtToken);

    }

    /**
     * Mutation resolver to enable a company.
     * @param id
     * @param context
     * @returns
     * */
    @Mutation(() => GenericReturn)
    enableCompany(
        @Arg("id", () => String) id: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return enableCompanyHandler(id, jwtToken);

    }

    /**
     * Mutation resolver to get the companies list.
     * @param context 
     * @returns 
     */
    @Query(() => GenericReturn)
    getCompaniesList(
        @Arg("status", () => String) status: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return getCompaniesListHandler(status, jwtToken);

    }

}

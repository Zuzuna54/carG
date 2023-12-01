// import { Mutation, Query, Resolver, Arg, Ctx } from "type-graphql";
// import createComanyAdmin from "../handlers/companyAdminHandlers/createCompanyAdmin";
// import logInHandler from "../handlers/authHandlers/logInHandler";
// import { State } from "../entities/State";
// import { Context } from "../contextInterface/context";

// @Resolver()
// export class StateResolver {
//     /**
//      * Query resolver to return a greeting.
//      * @returns A greeting.
//      */
//     @Query(() => String)
//     hello() {
//         return 'Hello World!';
//     }

//     /**
//      * Mutation resolver to create a new user.
//      * @param username - The username of the new user.
//      * @param email - The email of the new user.
//      * @param password - The password of the new user.
//      * @param userType - The type of the new user.
//      * @returns A message indicating the success of the user creation.
//      */

//     @Mutation(() => String)
//     createState(
//         @Arg("name", () => String) name: string,
//         @Arg("abbreviation", () => String) abbreviation: string,
//         @Ctx() context: Context
//     ): Promise<string> {
//         const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');

//         return createComanyAdmin(name, abbreviation, jwtToken);

//     }
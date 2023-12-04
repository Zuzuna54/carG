import { getCompany } from "../../neo4jCalls/compnayCalls/getCompany";
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";
import { GenericReturn } from "../../entities/genericReturn";
import { validateSession, decodeToken } from "../../utils/utils";

const getCompaniesListHandler = async (

    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating getCompaniesListHandler \n`);
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        //Authorization check with JWT
        console.log(`Authorization check with JWT\n`)
        if (!jwtToken) {

            console.error('Error: 498 No JWT token provided');
            result.result = `failed`;
            result.statusCode = 498;
            result.message = `Error 498: No JWT token provided`;
            return result;

        }

        console.log(`Decoding the JWT token\n`)
        const user: Record<string, any> | null = decodeToken(jwtToken);
        if (user?.userType !== SUPER_ADMIN) {

            console.error('Error: 401 User not authorized to create users');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create users`;
            return result;
        }

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;
            return result;
        }

        // Get the company by name 
        console.log(`Getting the companies list\n`)
        const companies: GenericReturn = await getCompany();
        if (companies.statusCode !== 200) {

            console.error('Error: 404 Could not retrieve the companies list');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Could not retrieve the companies list`;
            return result;

        }

        //Filtering the companies list to only return active companies
        console.log(`Filtering the companies list to only return active companies\n`)
        const activeCompanies: Record<string, any>[] = [];
        companies.data.forEach((company: Record<string, any>) => {

            if (company.status === ACTIVE) {

                activeCompanies.push(company);
            }
        });

        console.log(`activeCompanies: ${JSON.stringify(activeCompanies, null, 2)}\n`)

        console.log(`Returning the company \n`)
        result.result = `success`;
        result.statusCode = 200;
        result.message = `Success: 200 Company retrieved`;
        result.data = activeCompanies;
        return result;

    } catch (error) {

        console.error(`Error: 500 Internal Server Error: ${error}\n`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Internal Server Error: ${error}`;

        return result;
    }
}

export default getCompaniesListHandler;
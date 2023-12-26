import { getCompany } from '../../neo4jCalls/compnayCalls/getCompany';
import { SUPER_ADMIN, COMPANY_ADMIN } from '../../constants/constants';
import { decodeToken, validateSession } from '../../utils/utils';
import { GenericReturn } from "../../entities/genericReturn";

const getCompanyHandler = async (id: string, jwtToken: string | undefined): Promise<GenericReturn> => {

    console.log(`Initiating getCompanyHandler \n`);
    const result = new GenericReturn('', 0, '', '', '');

    try {

        // Authorization check with JWT
        console.log(`Authorization check with JWT\n`);
        if (!jwtToken) {

            console.error('Error: 498 No JWT token provided');
            result.result = `failed`;
            result.statusCode = 498;
            result.message = `Error 498: No JWT token provided`;
            return result;

        }

        // Decode the JWT token
        console.log(`Decoding the JWT token\n`);
        const user = decodeToken(jwtToken);
        if (!user || ![SUPER_ADMIN, COMPANY_ADMIN].includes(user.userType)) {

            console.error('Error: 401 User not authorized to get company');
            result.result = 'failed';
            result.statusCode = 401;
            result.message = 'Unauthorized access';
            return result;

        }

        // Validate session duration
        console.log(`Validating session duration\n`);
        if (!validateSession(user.lastLogIn)) {

            console.error('Error: 440 Session has expired');
            result.result = 'failed';
            result.statusCode = 440;
            result.message = 'Session expired';
            return result;

        }

        const companyResult = await getCompany(id);
        return companyResult;

    } catch (error) {

        console.error(`Error deleting company: ${error}`);
        result.result = 'failed';
        result.statusCode = 500;
        result.message = `Error fetching company: ${error}`;
        return result;

    }
}

export default getCompanyHandler;

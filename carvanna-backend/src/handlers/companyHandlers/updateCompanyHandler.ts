import { updateCompany } from '../../neo4jCalls/compnayCalls/updateCompany';
import { getCompany } from '../../neo4jCalls/compnayCalls/getCompany';
import { Company } from '../../entities/Company';
import { SUPER_ADMIN, COMPANY_ADMIN, ACTIVE } from '../../constants/constants';
import { validateEmail, validateSession, decodeToken } from '../../utils/utils';
import { GenericReturn } from "../../entities/genericReturn";

const updateCompanyHandler = async (
    id: string,
    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    jwtToken: string | undefined
): Promise<GenericReturn> => {

    console.log(`Initiating updateCompanyHandler \n`);
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
        if (!user || (user.userType !== SUPER_ADMIN && user.userType !== COMPANY_ADMIN)) {
            console.error('Error: 401 User not authorized to update company');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to update company`;
            return result;
        }

        // Validate session duration
        console.log(`Validating session duration\n`);
        const sessionValidated = validateSession(user.lastLogIn);
        if (!sessionValidated) {
            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;
            return result;
        }

        // Validate that the email is valid
        console.log(`Validating that the email is valid\n`);
        const emailValidated = validateEmail(email);
        if (!emailValidated) {
            console.error('Error: 501 Invalid email');
            result.result = `failed`;
            result.statusCode = 501;
            result.message = `Error: 501 Invalid email`;
            return result;
        }

        // Check if company exists
        console.log(`Checking if company exists\n`);
        const existingCompany = await getCompany(id);
        if (existingCompany.statusCode !== 200) {
            console.error('Error: 404 Company not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Company not found`;
            return result;
        }

        // Create updated Company object
        console.log(`Creating updated Company object\n`);
        const updatedCompany = new Company(
            id,
            name,
            description,
            address,
            phone,
            email,
            existingCompany.data.createdAt, // Keep the original creation date
            user.username, // Updated by the current user
            ACTIVE,
            existingCompany.data.ratingsArray, // Preserve existing ratings
            existingCompany.data.avgRating // Preserve existing average rating
        );

        // Update the Company
        console.log(`Updating the Company\n`);
        const updated = await updateCompany(updatedCompany);
        if (updated.statusCode !== 200) {
            console.error(`Error: 500 ${updated.message} Company could not be updated\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${updated.message} Company could not be updated`;
            return result;
        }

        console.log(`Company ${id} updated successfully\n`);
        result.id = updatedCompany.id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = updated.result;

        return result;

    } catch (err) {

        console.error(`Error: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${err}`;
        return result;

    }
}

export default updateCompanyHandler;

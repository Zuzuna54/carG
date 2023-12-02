import { createCompany } from '../../neo4jCalls/compnayCalls/createCompany';
import { getCompanyByName } from '../../neo4jCalls/compnayCalls/getCompanyByName';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../../entities/Company';
import { ACTIVE, SUPER_ADMIN } from '../../constants/constants';
import { validateEmail, validateSession, decodeToken } from '../../utils/utils';
import { GenericReturn } from "../../entities/genericReturn";

const createCompanyHandler = async (

    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createCompanyHandler \n`);
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

        //Validate that the email is valid
        console.log(`Validating that the email is valid\n`)
        const emailValidated: boolean = validateEmail(email);
        if (!emailValidated) {

            console.error('Error: 501 Invalid email');
            result.result = `failed`;
            result.statusCode = 501;
            result.message = `Error: 501 Invalid email`;

            return result;

        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!name || !description || !address || !phone || !email) {

            console.error('Error: 400 name, description, address, phone and email are required parameters.\n');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 name, description, address, phone and email are required parameters.`;

            return result;

        }

        // Validate that the Company doesn't already exist
        console.log(`Validating that the Company doesn't already exist\n`)
        const companyReturned: GenericReturn = await getCompanyByName(name);
        if (companyReturned.statusCode === 200) {

            console.error('Error: 409 Company already exists');
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Company already exists`;

            return result;

        }

        //Generate a UUID for the Company
        console.log(`Generating a UUID for the Company\n`)
        const id: string = uuidv4();

        // Create a new Company object
        console.log(`Creating a new Company object\n`)
        const company: Company = new Company(
            id,
            name,
            description,
            address,
            phone,
            email,
            new Date().toISOString(),
            user.username,
            ACTIVE
        );

        // Create the Company
        console.log(`Creating the Company\n`)
        const companyCreated: Record<string, any> = await createCompany(company);
        if (companyCreated.statusCode !== 200) {

            console.error(`Error: 500 ${companyCreated.message} company could not be created\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${companyCreated.message} company could not be created`;

            return result;

        }

        console.log(`Company ${id} created successfully\n`);
        result.id = company.id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = companyCreated.result;

        return result;

    } catch (err) {

        console.error(`Error: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${err}`;

        return result;

    }
}

export default createCompanyHandler;
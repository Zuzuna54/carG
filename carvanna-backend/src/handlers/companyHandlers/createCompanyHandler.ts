import { createCompany } from '../../neo4jCalls/compnayCalls/createCompany';
import { getCompanyByName } from '../../neo4jCalls/compnayCalls/getCompanyByName';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../../entities/Company';
import { ACTIVE, SUPER_ADMIN } from '../../constants/constants';
import { validateEmail, validateSession, decodeToken } from '../../utils/utils';

const createCompanyHandler = async (

    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    jwtToken: string | undefined

): Promise<string> => {

    console.log(`initiating createCompanyHandler \n`);

    try {

        //Authorization check with JWT
        console.log(`Authorization check with JWT\n`)
        if (!jwtToken) {

            console.error('Error: 498 No JWT token provided');
            return `Error: 498 No JWT token provided `;

        }

        console.log(`Decoding the JWT token\n`)
        const user: Record<string, any> | null = decodeToken(jwtToken);
        if (user?.userType !== SUPER_ADMIN) {

            console.error('Error: 401 User not authorized to create users');
            return `Error: 401 User not authorized to create users`;
        }

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            return `Error: 440 Session has expired`;

        }

        //Validate that the email is valid
        console.log(`Validating that the email is valid\n`)
        const emailValidated: boolean = validateEmail(email);
        if (!emailValidated) {

            console.error('Error: 501 Invalid email');
            return `Error: 501 Invalid email`;

        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!name || !description || !address || !phone || !email) {

            console.error('Error: 400 name, description, address, phone and email are required parameters.\n');
            return `Error: 400 name, description, address, phone and email are required parameters.`;

        }

        // Validate that the Company doesn't already exist
        console.log(`Validating that the Company doesn't already exist\n`)
        const companyReturned: Record<string, any> = await getCompanyByName(name);
        if (companyReturned.result) {

            console.error('Error: 409 Company already exists');
            return `Error: 409 Company already exists`;

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
            user?.id,
            ACTIVE
        );

        // Create the Company
        console.log(`Creating the Company\n`)
        const companyCreated: Record<string, any> = await createCompany(company);
        if (!companyCreated.createdCompany) {

            console.error(`Error: 500 ${companyCreated.result} company could not be created\n`);
            return `Error: 500 ${companyCreated.result} company could not be created`;

        }

        console.log(`Company ${company.id} created successfully\n`);
        return companyCreated.result;

    } catch (err) {

        console.error(`Error: ${err}`);
        return `Error: ${err}`;

    }
}

export default createCompanyHandler;
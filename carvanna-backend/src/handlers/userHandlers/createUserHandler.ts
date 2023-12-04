import { createUser } from '../../neo4jCalls/userCalls/createUser';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { getCompany } from '../../neo4jCalls/compnayCalls/getCompany';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User';
import { GenericReturn } from '../../entities/genericReturn';
import { SUPER_ADMIN, ACTIVE, COMPANY_ADMIN } from '../../constants/constants';
import {
    validateEmail,
    decodeToken,
    validateUsername,
    validatePassword,
    validateUserType,
    validateSession
} from '../../utils/utils';

const createComanyAdminHandler = async (

    username: string,
    email: string,
    password: string,
    userType: string,
    compnayId: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createComanyAdminHandler \n`);
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

        //Decode the JWT token
        console.log(`Decoding the JWT token\n`)
        const user: Record<string, any> | null = decodeToken(jwtToken);

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user?.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;

            return result;

        }

        //Validate that the user is a super admin or a company admin
        console.log(`Validating that the user is a super admin or a company admin\n`)
        if (user?.userType !== SUPER_ADMIN && user?.userType !== COMPANY_ADMIN) {

            console.error('Error: 401 User not authorized to create users');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create users`;

            return result;

        }

        //validate that compnay admin is not creating another company admin
        console.log(`Validating that the user is not creating another company admin\n`)
        if (user?.userType === COMPANY_ADMIN && userType === COMPANY_ADMIN) {

            console.error('Error: 401 User not authorized to create another company admin');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create another company admin`;

            return result;
        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!username || !email || !password || !userType || !compnayId) {

            console.error('Error: 400 username, email, password, userType and companyId are required parameters.\n');
            console.error(`username: ${username} email: ${email} password: ${password} userType: ${userType} companyId: ${compnayId}\n`);
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 username, email, password, userType and companyId are required parameters.`;

            return result;

        }

        //Validate that the username is valid
        console.log(`Validating that the username is valid\n`)
        const usernameValidated: boolean = validateUsername(username);
        if (!usernameValidated) {

            console.error('Error: 502 Invalid username');
            result.result = `failed`;
            result.statusCode = 502;
            result.message = `Error: 502 Invalid username`;

            return result;

        }

        //Validate that the password is valid
        console.log(`Validating that the password is valid\n`)
        const passwordValidated: boolean = validatePassword(password);
        if (!passwordValidated) {

            console.error('Error: 503 Invalid password');
            result.result = `failed`;
            result.statusCode = 503;
            result.message = `Error: 503 Invalid password`;

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

        //Validate that the userType is valid
        console.log(`Validating that the userType is valid\n`)
        const userTypeValidated: boolean = validateUserType(userType);
        if (!userTypeValidated) {

            console.error('Error: 504 Invalid userType');
            result.result = `failed`;
            result.statusCode = 504;
            result.message = `Error: 504 Invalid userType`;

            return result;

        }

        //Validate that company exists
        console.log(`Validating that the Company exists\n`)
        const company: GenericReturn = await getCompany(compnayId);
        if (company.statusCode !== 200) {

            console.error(`Error: 404 Auction ${compnayId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Auction ${compnayId} not found`;

            return result;

        }

        // Check if the user already exists
        console.log(`Checking if the user already exists \n`)
        const userCheck: GenericReturn = await getUserByUsername(username);
        if (userCheck.statusCode === 200) {

            console.error('Error: 409 Username already exists');
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Username already exists`;

            return result;

        }

        //Generate a random 6 digit code for email verification
        // console.log(`Generating a random 6 digit code for email verification`)
        // const code = Math.floor(100000 + Math.random() * 900000);
        // console.log(`code: ${code}`);

        //Send the email verification code to the user
        // console.log(`Sending the email verification code to the user`)
        // const emailResult = await sendEmail(email, code);

        // console.log(`emailResult: ${emailResult}`);

        //Generate an Unique ID for the user
        console.log(`Generating an Unique ID for the user\n`)
        const id: string = uuidv4();

        //Generate a salt and hash the password
        console.log(`Encrypting the password\n`)
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);
        console.log(`hashedPassword: ${hashedPassword}`);

        // Create a new User object
        const userTobeCreated: User = new User(
            id,
            username,
            email,
            hashedPassword,
            userType,
            new Date().toISOString(),
            '',
            '',
            new Date().toISOString(),
            '',
            user.username,
            compnayId,
            ACTIVE,
            '',
            ''
        );

        // Create the user
        console.log(`Calling createUser neo4j call\n`)
        const userCreated: Record<string, any> = await createUser(userTobeCreated);
        if (userCreated.statusCode !== 200) {

            console.error(`Error: 500 ${userCreated.message} user could not be created\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${userCreated.message} user could not be created`;

            return result;

        }

        console.log(`User ${userTobeCreated.id} created successfully\n`)
        result.id = user.id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = userCreated.result;

        return result;

    } catch (error) {

        console.error('Error creating user:', error);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 ${error}`;

        return result;

    }

};

export default createComanyAdminHandler;

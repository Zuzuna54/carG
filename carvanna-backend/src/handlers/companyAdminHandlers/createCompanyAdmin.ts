import { createUser } from '../../neo4jCalls/userCalls/createUser';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User';
import { SUPER_ADMIN, ACTIVE } from '../../constants/constants';
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

): Promise<string> => {

    console.log(`initiating createComanyAdminHandler \n`);

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

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!username || !email || !password || !userType || !compnayId) {

            console.error('Error: 400 username, email, password, userType and companyId are required parameters.\n');
            console.error(`username: ${username} email: ${email} password: ${password} userType: ${userType} companyId: ${compnayId}\n`);
            return `Error: 400 name, email, password and userType are required parameters.`;

        }

        //Validate that the username is valid
        console.log(`Validating that the username is valid\n`)
        const usernameValidated: boolean = validateUsername(username);
        if (!usernameValidated) {

            console.error('Error: 502 Invalid username');
            return `Error: 502 Invalid username`;

        }

        //Validate that the password is valid
        console.log(`Validating that the password is valid\n`)
        const passwordValidated: boolean = validatePassword(password);
        if (!passwordValidated) {

            console.error('Error: 503 Invalid password');
            return `Error: 503 Invalid password`;

        }

        //Validate that the email is valid
        console.log(`Validating that the email is valid\n`)
        const emailValidated: boolean = validateEmail(email);
        if (!emailValidated) {

            console.error('Error: 501 Invalid email');
            return `Error: 501 Invalid email`;

        }

        //Validate that the userType is valid
        console.log(`Validating that the userType is valid\n`)
        const userTypeValidated: boolean = validateUserType(userType);
        if (!userTypeValidated) {

            console.error('Error: 504 Invalid userType');
            return `Error: 504 Invalid userType`;

        }

        // Check if the user already exists
        console.log(`Checking if the user already exists \n`)
        const userCheck: Record<string, any> = await getUserByUsername(username);
        if (userCheck.result) {

            console.error('Error: 409 Username already exists');
            return `Error: 409 Username already exists`;

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
        if (!userCreated.createdUser) {

            console.error(`Error: 500 ${userCreated.result} user could not be created\n`);
            return `Error: 500 ${userCreated.result} user could not be created`;

        }

        console.log(`User ${user.id} created successfully\n`)
        return userCreated.result

    } catch (error) {

        console.error('Error creating user:', error);
        return `Error: ${error}`;

    }

};

export default createComanyAdminHandler;

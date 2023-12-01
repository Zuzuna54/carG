import { createCompanyAdmin } from '../../neo4jCalls/companyAdminCalls/createCompnayAadmin';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User';
import { decodeToken } from '../../contextInterface/context';
import { SUPER_ADMIN, ACTIVE } from '../../constants/constants';
import { validateEmail } from '../../utils/utils';

const createUserHandler = async (

    username: string,
    email: string,
    password: string,
    userType: string,
    compnayId: string,
    jwtToken: string | undefined

): Promise<string> => {

    console.log(`initiating createUserHandler \n`);

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

        //Validate that the email is valid
        console.log(`Validating that the email is valid\n`)
        const emailValidated: boolean = validateEmail(email);
        if (!emailValidated) {

            console.error('Error: 501 Invalid email');
            return `Error: 501 Invalid email`;

        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!username || !email || !password || !userType || !compnayId) {

            console.error('Error: 400 username, email, password, userType and companyId are required parameters.\n');
            console.error(`username: ${username} email: ${email} password: ${password} userType: ${userType} companyId: ${compnayId}\n`);
            return `Error: 400 name, email, password and userType are required parameters.`;

        }

        console.log(`Validating that the password is valid\n`)
        if (password.length < 8) {

            console.error('Error: 1001 password must be at least 8 characters long.\n');
            return `Error: 1001 password must be at least 8 characters long.`;

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
        const userTobeCreated: User = new User();
        userTobeCreated.username = username;
        userTobeCreated.email = email;
        userTobeCreated.password = hashedPassword;
        userTobeCreated.userType = userType;
        userTobeCreated.id = id;
        userTobeCreated.createdAt = new Date().toISOString();
        userTobeCreated.lastLogin = new Date().toISOString();
        userTobeCreated.createdBy = user.username;
        userTobeCreated.companyId = compnayId;
        userTobeCreated.status = ACTIVE;
        userTobeCreated.token = '';
        userTobeCreated.error = '';

        // Create the user
        console.log(`Calling createUser neo4j call\n`)
        const userCreated: Record<string, any> = await createCompanyAdmin(userTobeCreated);

        return userCreated.result

    } catch (error) {

        console.error('Error creating user:', error);
        return `Error: ${error}`;

    }

};

export default createUserHandler;

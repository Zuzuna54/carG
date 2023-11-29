import { createUser } from '../neo4jCalls/userCalls/createUser';
import { getUserByUsername } from '../neo4jCalls/userCalls/getUserByUsername';
import { v4 as uuidv4 } from 'uuid';
// import { context } from '../index';

const createUserHandler = async (username: string, email: string, password: string, userType: string): Promise<string> => {
 
    console.log(`initiating createUserHandler \n`);

    //Authorization check with JWT
    // if (!context.user) {
    //     console.error('Error: user not authenticated');
    //     return `Error: user not authenticated`;
    // }

    // Validate that name, email, and phone are provided in the request body
    console.log(`Validating that name, email, password and userType are provided in the request body\n`)

    if (!username || !email || !password || !userType) {

        console.error('Error: name, email, password and userType are required parameters.\n');
        return `Error: name, email, password and userType are required parameters.`;

    }

    console.log(`Validating that the password is valid\n`)
    if (password.length < 8){

        console.error('Error: password must be at least 8 characters long.\n');
        return `Error: password must be at least 8 characters long.`;

    }


    try {

        // Check if the user already exists
        console.log(`Checking if the user already exists \n`)
        const userCheck: Record<string, any> = await getUserByUsername(username);
        if (userCheck.user) {

            console.error('Error: Username already exists');
            return `Error: Username already exists`;

        }

        //Generate a salt and hash the password
        // console.log(`Generating a salt and hashing the password`)
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

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
        console.log(`id: ${id}`);

        // Create the user
        console.log(`Calling createUser neo4j call\n`)
        const user: Record<string, any> = await createUser(id ,username, email, password, userType);
        console.log(`result: ${user.result}`);
        
        return user.result

    } catch (error) {

        console.error('Error creating user:', error);
        return `Error: ${error}`;

    }

};

export default createUserHandler;

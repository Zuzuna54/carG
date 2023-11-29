require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserByUsername } from 'src/neo4jCalls/userCalls/getUserByUsername';


const logInHandler = async (username: string, password: string): Promise<string> => {


    //Authorization check with JWT
    // if (!context.user) {
    //     console.error('Error: user not authenticated');
    //     return `Error: user not authenticated`;
    // }

    // Validate that name, email, and phone are provided in the request body
    console.log(`Validating that name, email, password and userType are provided in the request body\n`)
    if (!username || !password) {

        console.error('Error: name, email, password and userType are required parameters.\n');
        return `Error: name, email, password and userType are required parameters.`;

    }



    try {

        // Get the user by username 
        console.log(`Getting the user by username \n`)
        const user: Record<string, any> = await getUserByUsername(username);
        if (!user.result) {

            console.error('Error: Username does not exist');
            return `Error: Username does not exist`;

        }

        //Check if the password is valid
        console.log(`Checking if the password is valid\n`)
        const validPassword = await bcrypt.compare(password, user.user.password);
        if (!validPassword) {

            console.error('Error: Invalid password');
            return `Error: Invalid password`;

        }

        const tokenSecret: Secret | undefined = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            console.error('Error: TOKEN_SECRET environment variable is not set');
            return 'Error: TOKEN_SECRET environment variable is not set';
        }

        //Create and assign a token
        console.log(`Creating and assigning a token\n`)
        const token = jwt.sign({ user: user }, tokenSecret);
        console.log(`token: ${token}`);

        return token;

    } catch (error) {

        console.error('Error creating user:', error);
        return `Error: ${error}`;

    }

};

export default logInHandler;

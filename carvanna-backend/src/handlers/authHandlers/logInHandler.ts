require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { User } from '../../entities/User';


const logInHandler = async (username: string, password: string): Promise<User> => {

    try {

        console.log(`\n\nRunning logInHandler.ts\n\n`);
        // Create a new Token object
        console.log(`Creating a new Token object\n`)
        const user: User = new User();

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)

        if (!username || !password) {

            console.error('Error: name, email, password and userType are required parameters.\n');
            user.result = false;
            user.error = `Error: name, email, password and userType are required parameters.`;

            return user
        }


        // Get the user by username 
        console.log(`Getting the user by username \n`)
        const userReturned: Record<string, any> = await getUserByUsername(username);
        user.id = userReturned.user.id;
        user.username = userReturned.user.username;
        user.email = userReturned.user.email;
        user.password = userReturned.user.password;
        user.userType = userReturned.user.userType;
        user.createdAt = userReturned.user.createdAt;
        user.lastLogin = userReturned.user.lastLogin;


        if (user.result) {

            console.error('Error: Username does not exist');
            user.result = false;
            user.error = `Error: Username does not exist`;

            return user
        }


        //Check if the password is valid
        console.log(`Checking if the password is valid\n`)
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(`validPassword: ${validPassword}`);
        if (!validPassword) {

            console.error('Error: Invalid password');
            user.result = false;
            user.error = `Error: Invalid password`;
            return user
        }

        const tokenSecret: Secret | undefined = process.env.TOKEN_SECRET;
        if (!tokenSecret) {

            console.error('Error: TOKEN_SECRET environment variable is not set');
            user.result = false;
            user.error = `Error: TOKEN_SECRET environment variable is not set`;
            return user
        }

        //Create and assign a token
        console.log(`Creating and assigning a token\n`)
        const token = jwt.sign({ user: user }, tokenSecret);
        user.token = token;
        user.result = true;

        return user


    } catch (error) {

        console.error('Error creating user:', error);
        const user: User = new User();
        user.result = false;
        user.error = `Error creating user: ${error}`;
        return user

    }

};

export default logInHandler;

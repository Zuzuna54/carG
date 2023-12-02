require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { updateUser } from '../../neo4jCalls/userCalls/updateUser';
import { User } from '../../entities/User';
import { GenericReturn } from '../../entities/genericReturn';


const logInHandler = async (username: string, password: string): Promise<User> => {

    console.log(`\n\nRunning logInHandler.ts\n\n`);
    const user: User = new User(
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    );
    try {

        // Create a new Token object
        console.log(`Creating a new Token object\n`)

        // validate that password and username are provided in the request body
        console.log(`Validating that password and username are provided in the request body\n`)
        if (!username || !password) {

            console.error('Error: 409 Password and username are required parameters.\n');
            user.error = `Error: 409 name, email, password and userType are required parameters.`;
            return user
        }

        // Get the user by username 
        console.log(`Getting the user by username \n`)
        const result: GenericReturn = await getUserByUsername(username);
        if (result.statusCode !== 200) {

            console.error('Error: 404 Username does not exist');
            user.error = `Error: 404 Username does not exist`;
            return user
        }

        console.log(`user returned data: ${JSON.stringify(result.data)}`);

        //Check if the password is valid
        console.log(`Checking if the password is valid\n`)
        const validPassword = await bcrypt.compare(password, result.data.password);
        console.log(`validPassword: ${validPassword}`);
        if (!validPassword) {

            console.error('Error: 401 Invalid password');
            user.error = `Error: 401 Invalid password`;
            return user
        }

        //Get the token secret
        const tokenSecret: Secret | undefined = process.env.TOKEN_SECRET;
        if (!tokenSecret) {

            console.error('Error: 500 TOKEN_SECRET environment variable is not set');
            user.error = `Error: 500 TOKEN_SECRET environment variable is not set`;
            return user
        }

        //Create and assign a token
        console.log(`Creating and assigning a token\n`)
        const signature: Record<string, any> = {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            userType: result.data.userType,
            lastLogIn: Date.now()
        };

        const token = jwt.sign({ user: signature }, tokenSecret);
        user.id = result.data.id;
        user.username = result.data.username;
        user.email = result.data.email;
        user.password = result.data.password;
        user.userType = result.data.userType;
        user.createdAt = result.data.createdAt;
        user.lastLogin = new Date().toISOString();
        user.createdBy = result.data.createdBy;
        user.token = token;

        //Update the last login time
        console.log(`Updating the last login time\n`)
        const updateLastLogin: GenericReturn = await updateUser(user);
        if (updateLastLogin.statusCode !== 200) {

            console.error(`Error: 500 ${updateLastLogin.message} 500 Failed to update last login time`);
            user.error = `Error: 500  ${updateLastLogin.message} Failed to update last login time`;
            return user
        }

        return user

    } catch (error) {

        console.error('Error: 500 logging in user:', error);
        user.error = `Error: 500 logging in user: ${error}`;
        return user

    }

};

export default logInHandler;

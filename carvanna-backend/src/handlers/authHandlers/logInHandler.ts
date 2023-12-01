require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { updateUser } from '../../neo4jCalls/userCalls/updateUser';
import { User } from '../../entities/User';


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
        const userReturned: Record<string, any> = await getUserByUsername(username);
        if (!userReturned.result) {

            console.error('Error: 404 Username does not exist');
            user.error = `Error: 404 Username does not exist`;
            return user
        }

        //Check if the password is valid
        console.log(`Checking if the password is valid\n`)
        const validPassword = await bcrypt.compare(password, userReturned.user.password);
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
            id: userReturned.user.id,
            username: userReturned.user.username,
            email: userReturned.user.email,
            userType: userReturned.user.userType,
            lastLogIn: Date.now()
        };

        const token = jwt.sign({ user: signature }, tokenSecret);
        user.id = userReturned.user.id;
        user.username = userReturned.user.username;
        user.email = userReturned.user.email;
        user.password = userReturned.user.password;
        user.userType = userReturned.user.userType;
        user.createdAt = userReturned.user.createdAt;
        user.lastLogin = new Date().toISOString();
        user.createdBy = userReturned.user.createdBy;
        user.token = token;

        //Update the last login time
        console.log(`Updating the last login time\n`)
        const updateLastLogin = await updateUser(user);
        if (!updateLastLogin.updatedUser) {

            console.error(`Error: 500 ${updateLastLogin.result} 500 Failed to update last login time`);
            user.error = `Error: 500  ${updateLastLogin.result} Failed to update last login time`;
            return user
        }

        return user

    } catch (error) {

        console.error('Error: 500 creating user:', error);
        user.error = `Error: 500 creating user: ${error}`;
        return user

    }

};

export default logInHandler;

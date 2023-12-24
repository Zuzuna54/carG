require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import { updateUser } from '../../neo4jCalls/userCalls/updateUser';
import { User } from '../../entities/User';
import { GenericReturn } from '../../entities/genericReturn';
import { Context } from "../../contextInterface/context";
import axios from 'axios';

const logInHandler = async (username: string, password: string, context: Context): Promise<User> => {

    console.log(`\n\nRunning logInHandler.ts\n\n`);
    const req = context.req;

    // log users ip 
    console.log(`log users ip \n`)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`ip: ${ip}`);

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
        "",
        [],
        [],
        {}
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
        const result: GenericReturn = await getUserByUsername(username.toLowerCase());
        if (result.statusCode !== 200) {

            console.error('Error: 404 Username does not exist');
            user.error = `Error: 404 Username does not exist`;
            return user
        }

        //Validate password
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

        //Create and assign a access token
        console.log(`Creating and assigning a token\n`)
        const signature: Record<string, any> = {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            userType: result.data.userType,
            lastLogIn: Date.now()
        };
        const token = jwt.sign({ user: signature }, tokenSecret);

        //Create and assign a refresh token
        console.log(`Creating and assigning a refresh token\n`)
        const refreshToken = jwt.sign({ user: { username: result.data.username, lastLogIn: Date.now() } }, tokenSecret);

        //Get users ip location 
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        console.log(`response.data: ${JSON.stringify(response.data)}`);

        const city = response.data.city;
        const region = response.data.region;
        const country = response.data.country;
        const countryName = response.data.country_name;
        const location = {
            city,
            region,
            country,
            countryName,
        }
        const date = new Date().toISOString();
        response.data.date = date;
        const ipLocations = JSON.parse(result.data.ipLocations) || [];
        ipLocations.push({ login: response.data })

        user.id = result.data.id;
        user.username = result.data.username;
        user.email = result.data.email;
        user.userType = result.data.userType;
        user.createdAt = result.data.createdAt;
        user.password = result.data.password
        user.lastLogin = date;
        user.createdBy = result.data.createdBy;
        user.accessToken = token;
        user.refreshToken = refreshToken;
        user.ipLocations = ipLocations;
        user.location = location;

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

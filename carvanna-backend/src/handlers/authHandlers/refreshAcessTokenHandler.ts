import { GenericReturn } from '../../entities/genericReturn';
import { decodeToken, validateRefreshSession } from '../../utils/utils';
import { getUserByUsername } from '../../neo4jCalls/userCalls/getUserByUsername';
import jwt, { Secret } from 'jsonwebtoken';

const refreshAcessTokenHandler = async (refreshToken: string): Promise<GenericReturn> => {

    console.log(`\n\nRunning refreshAcessTokenHandler.ts\n\n`);
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        //Authorization check with JWT
        console.log(`Authorization check with JWT\n`)
        if (!refreshToken) {

            console.error('Error: 498 No JWT token provided');
            result.result = `failed`;
            result.statusCode = 498;
            result.message = `Error 498: No JWT token provided`;
            return result;

        }

        //Decode the JWT token
        console.log(`Decoding the JWT token\n`)
        const username: Record<string, any> | null = decodeToken(refreshToken);

        //Validate session duration
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateRefreshSession(username?.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;
            return result;
        }

        //Get the user by username
        console.log(`Getting the user by username\n`)
        const user: GenericReturn = await getUserByUsername(username?.username);
        if (user.statusCode !== 200) {

            console.error('Error: 404 Username does not exist');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Username does not exist`;
            return result;
        }

        //Get the token secret
        const tokenSecret: Secret | undefined = process.env.TOKEN_SECRET;
        if (!tokenSecret) {

            console.error('Error: 500 Token secret not found');
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Token secret not found`;
            return result;
        }

        // Create a new Token object
        console.log(`Creating a new Token object\n`)
        const signature: Record<string, any> = {
            id: user.data.id,
            username: user.data.username,
            email: user.data.email,
            userType: user.data.userType,
            lastLogIn: Date.now()
        };

        const token = jwt.sign({ user: signature }, tokenSecret);

        result.result = `success`;
        result.statusCode = 200;
        result.message = `Success`;
        result.data = token;

        return result;


    } catch (error) {

        console.error(`Error: ${error}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${error}`;

        return result;
    }
}

export default refreshAcessTokenHandler;
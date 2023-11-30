import { Request } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


export interface Context {
    req: Request; // Extend the Request type with user property
}


export const decodeToken = (token: string): Record<string, any> | null => {

    const tokenSecret: Secret | undefined = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        console.error('Error: TOKEN_SECRET environment variable is not set');
        return null
    }

    // Verify the token
    const decodedToken: string | jwt.JwtPayload = jwt.verify(token, tokenSecret as Secret);
    const decodedTokenRecord: Record<string, any> = JSON.parse(JSON.stringify(decodedToken));
    const user: Record<string, any> = decodedTokenRecord.user;

    return user
}


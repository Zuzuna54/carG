import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { User } from '../../entities/User';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const updateUser = async (user: User): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, updating user ${user.username}\n`);

        //generate new updatedAt timestamp and updatedBy user conditionally 

        const queryResult: QueryResult<RecordShape> = await session.run(
            `
            MATCH (u:User {id: $id})
            SET u.username = $username, 
            u.email = $email, 
            u.password = $password, 
            u.userType = $userType, 
            u.lastLogin = $lastLogin,
            u.ipLocations = $ipLocations
            RETURN u
            `,
            {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType,
                lastLogin: user.lastLogin,
                ipLocations: JSON.stringify(user.ipLocations),
            }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to update user ${user.username}: User not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 User not found`;

            return result;

        } else {

            const updatedUser: Record<string, any> = queryResult.records[0].get('u').properties;
            console.log(`200: User ${updatedUser.username} updated\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: User ${updatedUser.username} updated`;
            result.id = updatedUser.id;

            return result;

        }

    } catch (err) {

        console.error(`failed to update user ${user.username}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to update user ${user.username}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
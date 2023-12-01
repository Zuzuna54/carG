import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { User } from '../../entities/User';
import driver from '../db';

export const updateUser = async (user: User): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, updating user ${user.username}\n`);

        //generate new updatedAt timestamp and updatedBy user conditionally 

        const result: QueryResult<RecordShape> = await session.run(
            `
            MATCH (u:User {id: $id})
            SET u.username = $username, u.email = $email, u.password = $password, u.userType = $userType, u.lastLogin = $lastLogin
            RETURN u
            `,
            {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType,
                lastLogin: user.lastLogin,

            }
        );

        const updatedUser: Record<string, any> = result.records[0].get('u').properties;
        console.log(`User ${updatedUser.username} updated with email ${updatedUser.email} and access rights of ${updatedUser.userType}\n`);

        return {

            result: `200: User ${updatedUser.username} updated with email ${updatedUser.email} and access rights of ${updatedUser.userType}`,
            updatedUser: true

        };

    } catch (err) {

        console.error(`failed to update user ${user.username}: ${err}`);
        return {

            result: `Error: ${err}`,
            updatedUser: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
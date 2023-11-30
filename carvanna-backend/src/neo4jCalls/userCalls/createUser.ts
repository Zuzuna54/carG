import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { User } from '../../entities/User';
import driver from '../db';

export const createUser = async (user: User): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    console.log(`user: ${user.id}\n`)

    try {

        console.log(`session opened, creating user ${user.username} with email ${user.email} and access rights of ${user.userType}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'CREATE (u:User {id: $id, username: $username, email: $email, password: $password, userType: $userType, createdAt: $createdAt, lastLogin: $lastLogin}) RETURN u',
            {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
            }
        );


        const createdUser: Record<string, any> = result.records[0].get('u').properties;
        console.log(createdUser);
        console.log(`User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}\n`);

        return {

            result: `User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}`,
            createdUser: true

        };

    } catch (err) {

        console.error(`failed to create user ${user.username} with email ${user.email} and access rights of ${user.userType}: ${err}`);
        return {

            result: `Error: ${err}`,
            createdUser: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
};
import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';

export const createUser = async (id: string, username: string, email: string, password: string, userType: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();


    try {

        console.log(`session opened, creating user ${username} with email ${email} and access rights of ${userType}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'CREATE (u:User {id: $id, username: $username, email: $email, password: $password, userType: $userType}) RETURN u',
            { id, username, email, password, userType }
        );


        const createdUser: Record<string, any> = result.records[0].get('u').properties;
        console.log(createdUser);
        console.log(`User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}\n`);

        return {

            result: `User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}`,
            createdUser: true

        };

    } catch (err) {

        console.error(`failed to create user ${username} with email ${email} and access rights of ${userType}: ${err}`);
        return {

            result: `Error: ${err}`,
            createdUser: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
};
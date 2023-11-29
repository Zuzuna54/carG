import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';

export const getUserById = async (id: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, getting user ${id}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (u:User {id: $id}) RETURN u',
            { id }
        );
        console.log(`result: ${result}\n`);
        console.log(`result.records: ${result.records}\n`);


        if (!result.records[0]) {

            console.error(`failed to get user ${id}: User not found`);
            return {

                result: `Error: User not found`,
                user: false

            }

        } else {

            const user: Record<string, any> = result.records[0].get('u').properties;
            console.log(`User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);

            return {

                result: `User ${user.username} found with email ${user.email} and access rights of ${user.userType}`,
                user: true

            };

        }

    } catch (err) {

        console.error(`failed to get user ${id}: ${err}`);
        return {

            result: `Error: ${err}`,
            user: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
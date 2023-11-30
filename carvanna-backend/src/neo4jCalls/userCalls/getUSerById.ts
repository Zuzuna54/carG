import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';

export const getUserById = async (id: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, getting user ${id}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (u:CompanyAdmin {id: $id}) RETURN u',
            { id }
        );


        if (!result.records[0]) {

            console.error(`failed to get user ${id}: User not found`);
            return {

                result: false,
                user: `Error: User not found`

            }

        } else {

            const user: Record<string, any> = result.records[0].get('u').properties;
            console.log(`User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);

            return {

                result: true,
                user: user

            };

        }

    } catch (err) {

        console.error(`failed to get user ${id}: ${err}`);
        return {

            result: false,
            user: `Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
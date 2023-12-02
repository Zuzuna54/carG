import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getUserById = async (id: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting user ${id}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (u:User {id: $id}) RETURN u',
            { id }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get user ${id}: User not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 User not found`;

            return result;

        } else {

            const user: Record<string, any> = queryResult.records[0].get('u').properties;
            console.log(`200: User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: User ${user.username} found with email ${user.email} and access rights of ${user.userType}`;
            result.id = user.id;
            result.data = user;

            return result;

        }

    } catch (err) {

        console.error(`failed to get user ${id}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get user ${id}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }

}
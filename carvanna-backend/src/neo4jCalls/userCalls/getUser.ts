import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getUser = async (id: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting user ${id}\n`);
        const query = id
            ? `
                MATCH (u:User {id: $id})
                RETURN u
            `
            : `
                MATCH (u:User)
                RETURN u
            `;
        const queryResult: QueryResult<RecordShape> = await session.run(query, { id });

        if (!queryResult.records[0]) {

            const errorMessage = id ? `404: failed to get user ${id}: User not found` : '404: No users found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;

            return result;

        } else {

            const users: any[] = queryResult.records.map(record => record.get('u').properties);
            result.result = `success`;
            result.statusCode = 200;
            result.message = id ? `200: User found with id ${id}` : '200: Users found';
            result.id = id || '';
            result.data = users;

            return result;

        }

    } catch (err) {

        const errorMessage = id ? `500: failed to get user ${id}: ${err}` : `500: failed to get users: ${err}`;
        console.error(errorMessage);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${errorMessage}`;
        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }

}
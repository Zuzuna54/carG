import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { GenericReturn } from '../../entities/genericReturn';
import driver from '../db';


export const getState = async (stateId?: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting state ${stateId}\n`);
        const query = stateId
            ? `
                MATCH (s:State {id: $id})
                RETURN s
            `
            : `
                MATCH (s:State)
                RETURN s
            `;
        const queryResult: QueryResult<RecordShape> = await session.run(query, { id: stateId });

        if (!queryResult.records[0]) {

            const errorMessage = stateId ? `404: failed to get state ${stateId}: State not found` : '404: No states found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;

        } else {

            const states: any[] = queryResult.records.map(record => record.get('s').properties);
            console.log(`200: ${stateId ? 'State' : 'States'} found\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: ${stateId ? 'State' : 'States'} found`;
            result.id = stateId || '';
            result.data = states;
            return result;

        }

    } catch (err) {

        const errorMessage = stateId ? `500: failed to get state ${stateId}: ${err}` : `500: failed to get states: ${err}`;
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
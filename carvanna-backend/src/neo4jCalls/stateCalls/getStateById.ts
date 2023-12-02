import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { GenericReturn } from '../../entities/genericReturn';
import driver from '../db';

export const getStateById = async (stateId: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting state ${stateId}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (s:State {id: $id}) RETURN s',
            { id: stateId }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get state ${stateId}: State not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 State not found`;

            return result;

        } else {

            const state: Record<string, any> = queryResult.records[0].get('s').properties;
            console.log(`200: State ${state.name} found with id ${state.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: State ${state.name} found with id ${state.id}`;
            result.id = state.id;
            result.data = state;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get state ${stateId}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get state ${stateId}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
}
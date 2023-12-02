import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getStateByName = async (stateName: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting state ${stateName}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (s:State {name: $name}) RETURN s',
            { name: stateName }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get state ${stateName}: State not found`);
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

        console.error(`500: failed to get state ${stateName}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get state ${stateName}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
}
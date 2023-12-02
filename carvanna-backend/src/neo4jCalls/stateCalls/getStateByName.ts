import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';

export const getStateByName = async (stateName: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, getting state ${stateName}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (s:State {name: $name}) RETURN s',
            { name: stateName }
        );

        if (!result.records[0]) {

            console.error(`404: failed to get state ${stateName}: State not found`);
            return {

                result: false,
                state: `404 Error: State not found`

            }

        } else {

            const state: Record<string, any> = result.records[0].get('s').properties;
            console.log(`200: State ${state.name} found with id ${state.id}\n`);

            return {

                result: true,
                state: state

            };

        }

    } catch (err) {

        console.error(`500: failed to get state ${stateName}: ${err}`);
        return {

            result: false,
            state: `500 Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
}
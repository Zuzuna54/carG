import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const getLocationById = async (locationId: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting location ${locationId}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (l:Location {id: $id}) RETURN l',
            { id: locationId }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get location ${locationId}: Location not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Location not found`;

            return result;

        } else {

            const location: Record<string, any> = queryResult.records[0].get('l').properties;
            console.log(`200: Location ${location.name} found with id ${location.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Location ${location.name} found with id ${location.id}`;
            result.id = location.id;
            result.data = location;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get location ${locationId}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get location ${locationId}: ${err}`;

        return result;

    } finally {

        console.log(`closing neo4j session\n`);
        await session.close();
    }
}
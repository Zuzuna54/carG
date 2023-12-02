import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const getLocationByName = async (locationName: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting location ${locationName}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (l:Location {name: $name}) RETURN l',
            { name: locationName }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get location ${locationName}: Location not found`);
            result.result = `404 Error: Location not found`;
            result.statusCode = 404;
            result.message = `failed`;

            return result;

        } else {

            const location: Record<string, any> = queryResult.records[0].get('l').properties;
            console.log(`200: Location ${location.name} found with id ${location.id}\n`);

            result.result = `200: Location ${location.name} found with id ${location.id}`;
            result.statusCode = 200;
            result.message = `success`;
            result.id = location.id;
            result.data = location;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get location ${locationName}: ${err}`);
        result.result = `500 Error: ${err}`;
        result.statusCode = 500;
        result.message = `failed`;

        return result;

    } finally {

        console.log(`closing neo4j session\n`);
        await session.close();
    }
}
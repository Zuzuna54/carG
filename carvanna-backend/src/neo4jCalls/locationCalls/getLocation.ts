import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getLocation = async (locationId?: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting location ${locationId}\n`);
        const query = locationId
            ? `
                MATCH (l:Location {id: $id})
                RETURN l
            `
            : `
                MATCH (l:Location)
                RETURN l
            `;

        const queryResult: QueryResult<RecordShape> = await session.run(query, { id: locationId });

        if (!queryResult.records[0]) {

            const errorMessage = locationId ? `404: failed to get location ${locationId}: Location not found` : '404: No locations found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;

        } else {

            const locations: any[] = queryResult.records.map(record => record.get('l').properties);
            console.log(`200: ${locationId ? 'Location' : 'Locations'} found\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = locationId ? `200: Location found with id ${locationId}` : '200: Locations found';
            result.data = locations;
            return result;

        }

    } catch (err) {

        const errorMessage = locationId ? `500: failed to get location ${locationId}: ${err}` : `500: failed to get locations: ${err}`;
        console.error(errorMessage);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${errorMessage}`;
        return result;

    } finally {

        console.log(`closing neo4j session\n`);
        await session.close();
    }
}
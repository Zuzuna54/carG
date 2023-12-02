import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getCar = async (id: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting car ${id}\n`);
        const query = id
            ? `
                MATCH (c:Car {id: $id})
                RETURN c
            `
            : `
                MATCH (c:Car)
                RETURN c
            `;

        const queryResult: QueryResult<RecordShape> = await session.run(query, { id });

        if (!queryResult.records[0]) {

            const errorMessage = id ? `404: failed to get car ${id}: Car not found` : '404: No cars found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;

        } else {

            const cars: any[] = queryResult.records.map(record => record.get('c').properties);
            console.log(`200: ${id ? 'Car' : 'Cars'} found\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = id ? `200: Car found with id ${id}` : '200: Cars found';
            result.id = id || '';
            result.data = cars;
            return result;

        }

    } catch (err) {

        const errorMessage = id ? `500: failed to get car ${id}: ${err}` : `500: failed to get cars: ${err}`;
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
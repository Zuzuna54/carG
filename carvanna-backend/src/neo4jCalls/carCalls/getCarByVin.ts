import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const getCarByVin = async (vin: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting car ${vin}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (c:Car {vin: $vin}) RETURN c',
            { vin }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get car ${vin}: Car not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Car not found`;

            return result;

        } else {

            const car: Record<string, any> = queryResult.records[0].get('c').properties;
            console.log(`200: Car ${car.vin} found with id ${car.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Car ${car.vin} found with id ${car.id}`;
            result.id = car.id;
            result.data = car;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get car ${vin}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get car ${vin}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
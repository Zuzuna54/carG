import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const getPriceById = async (priceId: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting price ${priceId}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            `
                MATCH (p:Price {id: $priceId})
                RETURN p
            `,
            {
                priceId
            }
        );

        if (!queryResult.records[0]) {

            console.error(`404: price ${priceId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Price ${priceId} not found`;

            return result

        } else {

            const price: Record<string, any> = queryResult.records[0].get('p').properties;
            console.log(`200: Price ${price.name} found with id: ${price.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Price ${price.name} found with id ${price.id}`;
            result.id = price.id;
            result.data = price;

            return result
        }

    } catch (err) {

        console.error(`500: failed to get price ${priceId}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get price ${priceId}`;

        return result

    } finally {

        await session.close();
        console.log(`session closed\n`);

    }
}
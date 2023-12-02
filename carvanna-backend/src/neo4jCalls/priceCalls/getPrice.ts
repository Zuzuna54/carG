import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getPrice = async (priceId?: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting price ${priceId}\n`);
        const query = priceId
            ? `
                MATCH (p:Price {id: $priceId})
                RETURN p
            `
            : `
                MATCH (p:Price)
                RETURN p
            `;

        const queryResult: QueryResult<RecordShape> = await session.run(query, { priceId }
        );

        if (!queryResult.records[0]) {

            const errorMessage = priceId ? `404: failed to get price ${priceId}: Price not found` : '404: No prices found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result

        } else {

            const prices: any[] = queryResult.records.map(record => record.get('p').properties);
            console.log(`200: ${priceId ? 'Price' : 'Prices'} found\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: ${priceId ? 'Price' : 'Prices'} found`;
            result.id = priceId || '';
            result.data = prices;

            return result
        }

    } catch (err) {

        const errorMessage = priceId ? `500: failed to get price ${priceId}: ${err}` : `500: failed to get prices: ${err}`;
        console.error(errorMessage);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${errorMessage}`;
        return result

    } finally {

        await session.close();
        console.log(`session closed\n`);

    }
}
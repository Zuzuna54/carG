import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getAuction = async (id?: string): Promise<GenericReturn> => {
    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting auction ${id}\n`);
        const query = id
            ? `
                MATCH (a:Auction {id: $id})
                RETURN a
            `
            : `
                MATCH (a:Auction)
                RETURN a
            `;

        const queryResult: QueryResult<RecordShape> = await session.run(query, { id });

        if (!queryResult.records[0]) {

            const errorMessage = id ? `404: failed to get auction ${id}: Auction not found` : '404: No auctions found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;

        } else {

            const auctions: any[] = queryResult.records.map(record => record.get('a').properties);
            console.log(`200: ${id ? 'Auction' : 'Auctions'} found\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = id ? `200: Auction found with id ${id}` : '200: Auctions found';
            result.id = id || '';
            result.data = auctions;
            return result;

        }

    } catch (err) {

        const errorMessage = id ? `500: failed to get auction ${id}: ${err}` : `500: failed to get auctions: ${err}`;
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

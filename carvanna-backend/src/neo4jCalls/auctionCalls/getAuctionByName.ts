import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getAuctionByName = async (name: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting auction ${name}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (a:Auction {name: $name}) RETURN a',
            { name }
        );

        if (!queryResult.records[0]) {

            console.error(`404: failed to get auction ${name}: Auction not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Auction not found`;

            return result;

        } else {

            const auction: Record<string, any> = queryResult.records[0].get('a').properties;
            console.log(`200: Auction ${auction.name} found with description ${auction.description}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Auction ${auction.name} found with description ${auction.description}`;
            result.id = auction.id;
            result.data = auction;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get auction ${name}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get auction ${name}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
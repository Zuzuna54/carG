import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';


export const getAuctionByName = async (name: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, getting auction ${name}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (a:Auction {name: $name}) RETURN a',
            { name }
        );

        if (!result.records[0]) {

            console.error(`404: failed to get auction ${name}: Auction not found`);
            return {

                result: false,
                auction: `404 Error: Auction not found`

            }

        } else {

            const auction: Record<string, any> = result.records[0].get('a').properties;
            console.log(`200: Auction ${auction.name} found with description ${auction.description} and status of ${auction.status}\n`);

            return {

                result: true,
                auction: auction

            };

        }

    } catch (err) {

        console.error(`500: failed to get auction ${name}: ${err}`);
        return {

            result: false,
            auction: `500 Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
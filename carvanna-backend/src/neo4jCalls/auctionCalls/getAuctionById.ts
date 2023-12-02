import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import driver from '../db';


export const getAuctionById = async (id: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, getting auction ${id}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (a:Auction {id: $id}) RETURN a',
            { id }
        );

        if (!result.records[0]) {

            console.error(`404: failed to get auction ${id}: Auction not found`);
            return {

                result: false,
                auction: `Error: Auction not found`

            }

        } else {

            const auction: Record<string, any> = result.records[0].get('a').properties;
            console.log(`200: Auction ${auction.name} found with id ${auction.id}\n`);

            return {

                result: true,
                auction: auction

            };

        }

    } catch (err) {

        console.error(`500: failed to get auction ${id}: ${err}`);
        return {

            result: false,
            auction: `500 Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }
}

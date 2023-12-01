import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Auction } from '../../entities/Auction';
import driver from '../db';

export const createAuction = async (auction: Auction): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, creating auction ${auction.name}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            `
                CREATE (a:Auction {
                    id: $id,
                    name: $name,
                    description: $description,
                    address: $address,
                    phone: $phone,
                    email: $email,
                    createdAt: $createdAt,
                    createdBy: $createdBy,
                    status: $status
                }) 
                RETURN a
            `,
            {
                id: auction.id,
                name: auction.name,
                description: auction.description,
                address: auction.address,
                phone: auction.phone,
                email: auction.email,
                createdAt: auction.createdAt,
                createdBy: auction.createdBy,
                status: auction.status
            }
        );

        const createdAuction: Record<string, any> = result.records[0].get('a').properties;
        console.log(`Auction ${createdAuction.name} created with id ${createdAuction.id} and status of ${createdAuction.status}\n`);

        return {

            result: `200: Auction ${createdAuction.name} created with id ${createdAuction.id} and status of ${createdAuction.status}`,
            createdAuction: true

        };

    } catch (err) {

        console.error(`failed to create auction ${auction.name}: ${err}`);
        return {

            result: `Error: ${err}`,
            createdAuction: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
};
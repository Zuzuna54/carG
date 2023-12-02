import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Auction } from '../../entities/Auction';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const createAuction = async (auction: Auction): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, creating auction ${auction.name}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
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

        if (!queryResult.records[0]) {

            console.error(`500: failed to create auction ${auction.name}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create auction ${auction.name}`;

            return result

        } else {

            const createdAuction: Record<string, any> = queryResult.records[0].get('a').properties;
            console.log(`200: Auction ${createdAuction.name} created with id ${createdAuction.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Auction ${createdAuction.name} created with id ${createdAuction.id}`;
            result.id = createdAuction.id;

            return result;
        }

    } catch (err) {

        console.error(`500: failed to create auction ${auction.name}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create auction ${auction.name}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
};
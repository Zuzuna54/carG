import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Price } from '../../entities/Price';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const createPrice = async (price: Price): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, creating price ${price.id} with cost ${price.cost}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            `
                MATCH (l:Location {id: $locationId})
                MATCH (c:Company {id: $companyId})
                CREATE (p:Price {
                    id: $id, 
                    cost: $cost, 
                    createdAt: $createdAt, 
                    createdBy: $createdBy, 
                    description: $description, 
                    status: $status,
                    locationId: $locationId,
                    companyId: $companyId
                }) 
                MERGE (l)<-[:BELONGS_TO]-(p)<-[:CREATED_BY]-(c)
                RETURN p
            `,
            {
                id: price.id,
                cost: price.cost,
                createdAt: price.createdAt,
                createdBy: price.createdBy,
                description: price.description,
                status: price.status,
                companyId: price.companyId,
                locationId: price.locationId
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to create price ${price.id} with id ${price.id}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create price ${price.id} with id ${price.id}`;

            return result

        } else {

            const createdPrice: Record<string, any> = queryResult.records[0].get('p').properties;
            console.log(`Price ${createdPrice.id} created with id: ${createdPrice.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Price ${createdPrice.id} created with id ${createdPrice.id}`;
            result.id = createdPrice.id;

            return result

        }

    } catch (error) {

        console.error(`500: failed to create price ${price.id} with id ${price.id} with error ${error}\n`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create price ${price.id} with id ${price.id}`;

        return result

    } finally {

        await session.close();
        console.log(`session closed\n`);

    }

}
import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { State } from '../../entities/State';
import driver from '../db';

export const createState = async (state: State): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, creating state ${state.name}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            `   MATCH (a:Auction {id: $auctionId})
                CREATE (s:State {
                    id: $id,
                    name: $name,
                    abbrevation: $abbrevation,
                    auctionId: $auctionId,
                    createdAt: $createdAt,
                    createdBy: $createdBy,
                    status: $status
                }) 
                MERGE (s)-[:BELONGS_TO]->(a)
                RETURN s
            `,
            {
                id: state.id,
                name: state.name,
                abbrevation: state.abbrevation,
                auctionId: state.auctionId,
                createdAt: state.createdAt,
                createdBy: state.createdBy,
                status: state.status
            }
        );

        const createdState: Record<string, any> = result.records[0].get('s').properties;
        console.log(`200: State ${createdState.name} created with id ${createdState.id} and status of ${createdState.status}\n`);

        return {

            result: `200: State ${createdState.name} created with id ${createdState.id} and status of ${createdState.status}`,
            createdState: true

        };

    } catch (err) {

        console.error(`500: failed to create state ${state.name}: ${err}`);
        return {

            result: `500 Error: ${err}`,
            createdState: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);
    }

}   
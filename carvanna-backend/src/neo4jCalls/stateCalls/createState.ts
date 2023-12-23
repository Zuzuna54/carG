import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { State } from '../../entities/State';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const createState = async (state: State): Promise<GenericReturn> => {
    console.log(`opening neo4j session\n`);
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {
        // Check for state name uniqueness per auction ID
        console.log(`session opened, checking if state ${state.name} already exists for auction ${state.auctionId}\n`);
        const existingStateQuery = await session.run(
            `MATCH (s:State {name: $name})-[:BELONGS_TO]->(a:Auction {id: $auctionId})
             RETURN s`,
            {
                name: state.name,
                auctionId: state.auctionId
            }
        );

        if (existingStateQuery.records.length > 0) {
            console.error(`State with name ${state.name} already exists for auction ${state.auctionId}`);
            result.result = 'failed';
            result.statusCode = 409; // Conflict
            result.message = `Error: State with name ${state.name} already exists for auction ${state.auctionId}`;
            return result;
        }

        // Create state if name is unique for the auction ID
        console.log(`State name is unique for auction ${state.auctionId}, creating state ${state.name}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            `MATCH (a:Auction {id: $auctionId})
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
             RETURN s`,
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

        if (!queryResult.records[0]) {
            console.error(`500: failed to create state ${state.name}`);
            result.result = 'failed';
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create state ${state.name}`;
            return result;
        } else {
            const createdState = queryResult.records[0].get('s').properties;
            console.log(`200: State ${createdState.name} created with id ${createdState.id}\n`);
            result.result = 'success';
            result.statusCode = 200;
            result.message = `State ${createdState.name} created with id ${createdState.id}`;
            result.id = createdState.id;
            return result;
        }
    } catch (err) {
        console.error(`500: failed to create state ${state.name}: ${err}`);
        result.result = 'failed';
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create state ${state.name}: ${err}`;
        return result;
    } finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};

import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Location } from '../../entities/Location';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const createLocation = async (location: Location): Promise<GenericReturn> => {
    console.log(`opening neo4j session\n`);
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {
        // Check for location name uniqueness within the state
        console.log(`session opened, checking if location ${location.name} already exists in state ${location.stateId}\n`);
        const existingLocationQuery = await session.run(
            `MATCH (l:Location {name: $name})-[:BELONGS_TO]->(s:State {id: $stateId})
             RETURN l`,
            {
                name: location.name,
                stateId: location.stateId
            }
        );

        if (existingLocationQuery.records.length > 0) {

            console.error(`Location with name ${location.name} already exists in state ${location.stateId}`);
            result.result = 'failed';
            result.statusCode = 409; // Conflict
            result.message = `Error: Location with name ${location.name} already exists in state ${location.stateId}`;
            return result;

        }

        // Create location if name is unique within the state
        console.log(`Location name is unique within state ${location.stateId}, creating location ${location.name}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            `MATCH (s:State {id: $stateId})
             CREATE (l:Location {
                 id: $id,
                 name: $name,
                 stateId: $stateId,
                 createdAt: $createdAt,
                 createdBy: $createdBy,
                 status: $status
             }) 
             MERGE (l)-[:BELONGS_TO]->(s)
             RETURN l`,
            {
                id: location.id,
                name: location.name,
                stateId: location.stateId,
                createdAt: location.createdAt,
                createdBy: location.createdBy,
                status: location.status
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to create location ${location.name}`);
            result.result = 'failed';
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create location ${location.name}`;
            return result;

        } else {

            const createdLocation = queryResult.records[0].get('l').properties;
            console.log(`200: Location ${createdLocation.name} created with id ${createdLocation.id}\n`);
            result.result = 'success';
            result.statusCode = 200;
            result.message = `Location ${createdLocation.name} created with id ${createdLocation.id}`;
            result.id = createdLocation.id;
            return result;

        }
    } catch (err) {

        console.error(`500: failed to create location ${location.name}: ${err}`);
        result.result = 'failed';
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create location ${location.name}: ${err}`;
        return result;

    } finally {

        console.log(`closing neo4j session\n`);
        await session.close();

    }
};

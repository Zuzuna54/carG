import { QueryResult, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const deleteCompany = async (id: string): Promise<GenericReturn> => {
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {
        const queryResult: QueryResult = await session.run(
            `MATCH (c:Company {id: $id})
             DETACH DELETE c
             RETURN c`,
            { id }
        );

        if (queryResult.records.length === 0) {
            console.error(`404: Failed to delete company ${id}: Company not found`);
            result.result = 'failed';
            result.statusCode = 404;
            result.message = `Error: 404 Failed to delete company ${id}: Company not found`;
            return result;
        }

        console.log(`200: Company ${id} deleted successfully`);
        result.result = 'success';
        result.statusCode = 200;
        result.message = `200: Company ${id} deleted successfully`;
        result.id = id;
        return result;

    } catch (err) {
        console.error(`500: Failed to delete company ${id}: ${err}`);
        result.result = 'failed';
        result.statusCode = 500;
        result.message = `Error: 500 Failed to delete company ${id}: ${err}`;
        return result;
    } finally {
        await session.close();
    }
};

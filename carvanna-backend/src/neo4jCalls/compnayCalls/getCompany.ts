import { QueryResult, RecordShape } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const getCompany = async (id?: string): Promise<GenericReturn> => {
    console.log(`Opening neo4j session\n`);
    const session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {
        console.log(`Session opened, getting company ${id}\n`);

        const query = id
            ? `
                MATCH (c:Company {id: $id})
                RETURN c
            `
            : `
                MATCH (c:Company)
                RETURN c
            `;

        const queryResult: QueryResult<RecordShape> = await session.run(query, { id });

        if (!queryResult.records[0]) {

            const errorMessage = id ? `404: Failed to get company ${id}: Company not found` : '404: No companies found';
            console.error(errorMessage);
            result.result = 'failed';
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;

        } else {

            const companies: any[] = queryResult.records.map(record => record.get('c').properties);
            console.log(`200: ${id ? 'Company' : 'Companies'} found\n`);
            result.result = 'success';
            result.statusCode = 200;
            result.message = id ? `200: Company found with id ${id}` : '200: Companies found';
            result.id = id || '';
            result.data = id ? companies[0] : companies;
            return result;

        }
    } catch (err) {

        const errorMessage = id ? `500: Failed to get company ${id}: ${err}` : `500: Failed to get companies: ${err}`;
        console.error(errorMessage);
        result.result = 'failed';
        result.statusCode = 500;
        result.message = `Error: ${errorMessage}`;
        return result;

    } finally {
        await session.close();
        console.log(`Neo4j session closed\n`);
    }
};

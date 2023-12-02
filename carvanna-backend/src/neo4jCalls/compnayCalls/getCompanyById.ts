import { QueryResult, RecordShape } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const getCompanyById = async (id: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, getting company ${id}\n`);
        const queryResult: QueryResult<RecordShape> = await session.run(
            'MATCH (c:Company {id: $id}) RETURN c',
            { id }
        );


        if (!queryResult.records[0]) {

            console.error(`404: failed to get company ${id}: Company not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Company not found`;

            return result;

        } else {

            const company: Record<string, any> = queryResult.records[0].get('c').properties;
            console.log(`200: Company ${company.name} found with id ${company.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Company ${company.name} found with id ${company.id}`;
            result.id = company.id;
            result.data = company;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to get company ${id}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get company ${id}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}

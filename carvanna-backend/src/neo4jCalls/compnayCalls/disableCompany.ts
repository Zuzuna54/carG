import { QueryResult, Session } from 'neo4j-driver';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const disableCompany = async (id: string): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, updating company ${id} to DISABLED\n`);
        const queryResult: QueryResult = await session.run(
            `MATCH (c:Company {id: $id})
             SET c.status = COALESCE($status, c.status)
             RETURN c`,
            {
                id: id,
                status: "DISABLED",
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to update company ${id} to DISABLED`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to update company ${id} to DISABLED`;

            return result;

        } else {

            const updatedCompany = queryResult.records[0].get('c').properties;
            console.log(`Company ${updatedCompany.name} updated to disabld id: ${updatedCompany.id}\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Company ${updatedCompany.name} updated to disabled with id ${updatedCompany.id}`;
            result.id = updatedCompany.id;

            return result;

        }
    } catch (err) {

        console.error(`Error: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`session closed\n`);
    }
};
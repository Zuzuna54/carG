import { QueryResult, RecordShape } from 'neo4j-driver';
import driver from '../db';

export const getCompanyById = async (id: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session = driver.session();

    try {

        console.log(`session opened, getting company ${id}\n`);
        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (c:Company {id: $id}) RETURN c',
            { id }
        );


        if (!result.records[0]) {

            console.error(`failed to get company ${id}: Company not found`);
            return {

                result: false,
                company: `Error: Company not found`

            }

        } else {

            const company: Record<string, any> = result.records[0].get('c').properties;
            console.log(`Company ${company.name} found with description ${company.description} and address of ${company.address}\n`);

            return {

                result: true,
                company: company

            };

        }

    } catch (err) {

        console.error(`failed to get company ${id}: ${err}`);
        return {

            result: false,
            company: `Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}

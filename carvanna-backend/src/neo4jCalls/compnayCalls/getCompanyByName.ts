import { QueryResult, RecordShape } from 'neo4j-driver';
import driver from '../db';

export const getCompanyByName = async (name: string): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session = driver.session();

    try {

        console.log(`session opened, getting company ${name}\n`);
        const result: QueryResult<RecordShape> = await session.run(
            'MATCH (c:Company {name: $name}) RETURN c',
            { name }
        );


        if (!result.records[0]) {

            console.error(`404: failed to get company ${name}: Company not found`);
            return {

                result: false,
                company: `404 Error: Company not found`

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

        console.error(`500: failed to get company ${name}: ${err}`);
        return {

            result: false,
            company: `500 Error: ${err}`

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
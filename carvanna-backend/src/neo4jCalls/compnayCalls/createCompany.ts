import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Company } from '../../entities/Company';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const createCompany = async (company: Company): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, creating company ${company.name} with description ${company.description} and address of ${company.address}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            `CREATE (c:Company {
                id: $id, 
                name: $name, 
                description: $description, 
                createdAt: $createdAt, 
                createdBy: $createdBy, 
                address: $address, 
                phone: $phone, 
                email: $email
            }) 
            RETURN c`,
            {
                id: company.id,
                name: company.name,
                description: company.description,
                createdAt: company.createdAt,
                createdBy: company.createdBy,
                address: company.address,
                phone: company.phone,
                email: company.email
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to create company ${company.name} with id ${company.id}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create company ${company.name} with id ${company.id}`;

            return result

        } else {

            const createdCompany: Record<string, any> = queryResult.records[0].get('c').properties;
            console.log(`Company ${createdCompany.name} created with id: ${createdCompany.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Company ${createdCompany.name} created with id ${createdCompany.id}`;
            result.id = createdCompany.id;

            return result

        }

    } catch (err) {

        console.error(`500: failed to create company ${company.name} with id ${company.id}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create company ${company.name} with id ${company.id}: ${err}`;

        return result

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
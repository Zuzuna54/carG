import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Company } from '../../entities/Company';
import driver from '../db';

export const createCompany = async (company: Company): Promise<Record<string, any>> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();

    try {

        console.log(`session opened, creating company ${company.name} with description ${company.description} and address of ${company.address}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            'CREATE (c:Company {id: $id, name: $name, description: $description, createdAt: $createdAt, createdBy: $createdBy, address: $address, phone: $phone, email: $email}) RETURN c',
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


        const createdCompany: Record<string, any> = result.records[0].get('c').properties;
        console.log(`Company ${createdCompany.id} created with description ${createdCompany.description} and address of ${createdCompany.address}\n`);

        return {

            result: `200: Company ${createdCompany.name} created with description ${createdCompany.description} and address of ${createdCompany.address}`,
            createdCompany: true

        };

    } catch (err) {

        console.error(`failed to create company ${company.name} with description ${company.description} and address of ${company.address}: ${err}`);
        return {

            result: `Error: ${err}`,
            createdCompany: false

        }

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }
}
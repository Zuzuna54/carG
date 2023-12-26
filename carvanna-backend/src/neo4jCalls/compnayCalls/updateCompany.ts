import { QueryResult, Session } from 'neo4j-driver';
import { Company } from '../../entities/Company';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';

export const updateCompany = async (company: Company): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, updating company ${company.name} with description ${company.description} and address of ${company.address}\n`);

        const queryResult: QueryResult = await session.run(
            `MATCH (c:Company {id: $id})
             SET c.name = COALESCE($name, c.name),
                 c.description = COALESCE($description, c.description),
                 c.address = COALESCE($address, c.address),
                 c.phone = COALESCE($phone, c.phone),
                 c.email = COALESCE($email, c.email),
                 c.status = COALESCE($status, c.status),
                 c.ratingsArray = COALESCE($ratingsArray, c.ratingsArray),
                 c.avgRating = COALESCE($avgRating, c.avgRating)
             RETURN c`,
            {
                id: company.id,
                name: company.name,
                description: company.description,
                address: company.address,
                phone: company.phone,
                email: company.email,
                status: company.status,
                ratingsArray: company.ratingsArray,
                avgRating: company.avgRating
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to update company ${company.name} with id ${company.id}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to update company ${company.name} with id ${company.id}`;

            return result

        } else {

            const updatedCompany = queryResult.records[0].get('c').properties;
            console.log(`Company ${updatedCompany.name} updated id: ${updatedCompany.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Company ${updatedCompany.name} updated with id ${updatedCompany.id}`;
            result.id = updatedCompany.id;

            return result

        }
    } catch (err) {

        console.error(`Error: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${err}`;

        return result
    } finally {

        await session.close();
        console.log(`session closed\n`)
    }
};
import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { User } from '../../entities/User';
import driver from '../db';

export const createCompanyAdmin = async (user: User): Promise<Record<string, any>> => {
    console.log(`Opening neo4j session\n`);
    const session: Session = driver.session();

    try {
        console.log(`Session opened, creating user ${user.username} with email ${user.email} and access rights of ${user.userType}\n`);

        const result: QueryResult<RecordShape> = await session.run(
            `
            MATCH (company:Company {id: $companyId})
            CREATE (u:CompanyAdmin:User {id: $id, username: $username, email: $email, password: $password, userType: $userType, createdAt: $createdAt, lastLogin: $lastLogin, createdBy: $createdBy})
            MERGE (u)-[:BELONGS_TO]->(company)
            RETURN u
            `,
            {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
                createdBy: user.createdBy,
                companyId: user.companyId
            }
        );

        const createdUser: Record<string, any> = result.records[0].get('u').properties;
        console.log(`User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}\n`);

        return {
            result: `200: User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}`,
            createdUser: true
        };
    } catch (err) {
        console.error(`Failed to create user ${user.username} with email ${user.email} and access rights of ${user.userType}: ${err}`);
        return {
            result: `Error: ${err}`,
            createdUser: false
        };
    } finally {
        await session.close();
        console.log(`Neo4j session closed\n`);
    }
};

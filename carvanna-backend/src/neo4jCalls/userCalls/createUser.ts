import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { User } from '../../entities/User';
import driver from '../db';
import { COMPANY_ADMIN, COMPANY_USER } from '../../constants/constants';
import { GenericReturn } from '../../entities/genericReturn';


//Define query according to User type
const returnUserQuery = (userType: string): string => {

    switch (userType) {

        case COMPANY_ADMIN:
            return `
                MATCH (company:Company {id: $companyId})
                CREATE (u:${userType}:User {
                    id: $id, 
                    username: $username, 
                    email: $email, 
                    password: $password, 
                    userType: $userType, 
                    createdAt: $createdAt, 
                    lastLogin: $lastLogin, 
                    createdBy: $createdBy, 
                    status: $status
                })
                MERGE (u)-[:BELONGS_TO]->(company)
                RETURN u
            `;

        case COMPANY_USER:
            return `
                MATCH (company:Company {id: $companyId})
                MATCH (creator:User {username: $createdBy})
                CREATE (u:${userType}:User {
                    id: $id, 
                    username: $username, 
                    email: $email, 
                    password: $password, 
                    userType: $userType, 
                    createdAt: $createdAt, 
                    lastLogin: $lastLogin, 
                    createdBy: $createdBy, 
                    status: $status
                })
                MERGE (creator)<-[:CREATED_BY]-(u)-[:BELONGS_TO]->(company)
                RETURN u
            `;

        case 'User':
            return 'RETURN u';

        default:
            return 'RETURN u';

    }
}

export const createUser = async (user: User): Promise<GenericReturn> => {

    console.log(`Opening neo4j session\n`);
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`Session opened, creating user ${user.username} with email ${user.email} and access rights of ${user.userType}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            returnUserQuery(user.userType),
            {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                userType: user.userType,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
                createdBy: user.createdBy,
                companyId: user.companyId,
                status: user.status
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: Failed to create user ${user.username} with id ${user.id}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create user ${user.username} with id ${user.id}`;

            return result;

        } else {

            const createdUser: Record<string, any> = queryResult.records[0].get('u').properties;
            console.log(`200: User ${createdUser.username} created with email ${createdUser.email}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: User ${createdUser.username} created with email ${createdUser.email}`;
            result.id = createdUser.id;

            return result;
        }

    } catch (err) {

        console.error(`Failed to create user ${user.username} with id ${user.id}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create user ${user.username} with id ${user.id}`;

        return result;

    } finally {

        await session.close();
        console.log(`Neo4j session closed\n`);

    }
};

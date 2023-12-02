"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const constants_1 = require("../../constants/constants");
const returnUserQuery = (userType) => {
    switch (userType) {
        case constants_1.COMPANY_ADMIN:
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
        case constants_1.COMPANY_USER:
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
};
const createUser = async (user) => {
    console.log(`Opening neo4j session\n`);
    const session = db_1.default.session();
    try {
        console.log(`Session opened, creating user ${user.username} with email ${user.email} and access rights of ${user.userType}\n`);
        const result = await session.run(returnUserQuery(user.userType), {
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
        });
        const createdUser = result.records[0].get('u').properties;
        console.log(`User ${createdUser.username} created with id ${createdUser.id} and access rights of ${createdUser.userType}\n`);
        return {
            result: `200: User ${createdUser.username} created with id ${createdUser.id} and access rights of ${createdUser.userType}`,
            createdUser: true
        };
    }
    catch (err) {
        console.error(`Failed to create user ${user.username} with id ${user.id} and access rights of ${user.userType}: ${err}`);
        return {
            result: `Error: ${err}`,
            createdUser: false
        };
    }
    finally {
        await session.close();
        console.log(`Neo4j session closed\n`);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map
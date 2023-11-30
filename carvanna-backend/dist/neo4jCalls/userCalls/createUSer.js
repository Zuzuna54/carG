"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = async (user) => {
    console.log(`Opening neo4j session\n`);
    const session = db_1.default.session();
    try {
        console.log(`Session opened, creating user ${user.username} with email ${user.email} and access rights of ${user.userType}\n`);
        const result = await session.run(`
            MATCH (company:Company {id: $companyId})
            CREATE (u:User {id: $id, username: $username, email: $email, password: $password, userType: $userType, createdAt: $createdAt, lastLogin: $lastLogin, createdBy: $createdBy})
            MERGE (u)-[:BELONGS_TO]->(company)
            RETURN u
            `, {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            userType: user.userType,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
            createdBy: user.createdBy,
            companyId: user.companyId
        });
        const createdUser = result.records[0].get('u').properties;
        console.log(`User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}\n`);
        return {
            result: `200: User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}`,
            createdUser: true
        };
    }
    catch (err) {
        console.error(`Failed to create user ${user.username} with email ${user.email} and access rights of ${user.userType}: ${err}`);
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
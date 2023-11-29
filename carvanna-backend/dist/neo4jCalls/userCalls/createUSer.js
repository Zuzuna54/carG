"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_1 = __importDefault(require("../db"));
const createUser = async (id, username, email, password, userType) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    try {
        console.log(`session opened, creating user ${username} with email ${email} and access rights of ${userType}\n`);
        const result = await session.run('CREATE (u:User {id: $id, username: $username, email: $email, password: $password, userType: $userType}) RETURN u', { id, username, email, password: password, userType });
        const createdUser = result.records[0].get('u').properties;
        console.log(createdUser);
        console.log(`User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}\n`);
        return {
            result: `User ${createdUser.username} created with email ${createdUser.email} and access rights of ${createdUser.userType}`,
            createdUser: true
        };
    }
    catch (err) {
        console.error(`failed to create user ${username} with email ${email} and access rights of ${userType}: ${err}`);
        return {
            result: `Error: ${err}`,
            createdUser: false
        };
    }
    finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map
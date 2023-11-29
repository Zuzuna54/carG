"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const db_1 = __importDefault(require("../db"));
const getUser = async (username) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    console.log(`neo4j session opened\n`);
    try {
        console.log(`session opened, getting user ${username}\n`);
        const result = await session.run('MATCH (u:User {username: $username}) RETURN u', { username });
        const user = result.records[0].get('u').properties;
        console.log(user);
        console.log(`User ${user.username} found with email ${user.email} and access rights of ${user.type}\n`);
        return {
            result: `User ${user.username} found with email ${user.email} and access rights of ${user.type}`,
            user: true
        };
    }
    catch (err) {
        console.error(`failed to get user ${username}: ${err}`);
        return {
            result: `Error: ${err}`,
            user: false
        };
    }
    finally {
        await session.close();
        console.log(`neo4j session closed`);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map
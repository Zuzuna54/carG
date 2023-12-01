"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = void 0;
const db_1 = __importDefault(require("../db"));
const getUserByUsername = async (username) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    try {
        console.log(`session opened, getting user ${username}\n`);
        const result = await session.run('MATCH (u:User {username: $username}) RETURN u', { username });
        if (!result.records[0]) {
            console.error(`failed to get user ${username}: User not found`);
            return {
                result: false,
                user: `Error: User not found`
            };
        }
        else {
            const user = result.records[0].get('u').properties;
            console.log(`User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);
            return {
                result: true,
                user: user
            };
        }
    }
    catch (err) {
        console.error(`failed to get user ${username}: ${err}`);
        return {
            result: false,
            user: `Error: ${err}`
        };
    }
    finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=getUserByUsername.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = void 0;
const db_1 = __importDefault(require("../db"));
const genericReturn_1 = require("../../entities/genericReturn");
const getUserByUsername = async (username) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    const result = new genericReturn_1.GenericReturn('', 0, '', '', '');
    try {
        console.log(username);
        console.log(`session opened, getting user ${username}\n`);
        const queryResult = await session.run('MATCH (u:User {username: $username}) RETURN u', { username });
        if (!queryResult.records[0]) {
            console.error(`404: failed to get user ${username}: User not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 User not found`;
            return result;
        }
        else {
            const user = queryResult.records[0].get('u').properties;
            console.log(`200: User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);
            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: User ${user.username} found with email ${user.email} and access rights of ${user.userType}`;
            result.id = user.id;
            result.data = user;
            return result;
        }
    }
    catch (err) {
        console.error(`failed to get user ${username}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to get user ${username}: ${err}`;
        return result;
    }
    finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=getUserByUsername.js.map
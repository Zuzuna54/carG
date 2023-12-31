"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const db_1 = __importDefault(require("../db"));
const genericReturn_1 = require("../../entities/genericReturn");
const getUser = async (id) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    const result = new genericReturn_1.GenericReturn('', 0, '', '', '');
    try {
        console.log(`session opened, getting user ${id}\n`);
        const query = id
            ? `
                MATCH (u:User {id: $id})
                RETURN u
            `
            : `
                MATCH (u:User)
                RETURN u
            `;
        const queryResult = await session.run(query, { id });
        if (!queryResult.records[0]) {
            const errorMessage = id ? `404: failed to get user ${id}: User not found` : '404: No users found';
            console.error(errorMessage);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: ${errorMessage}`;
            return result;
        }
        else {
            const users = queryResult.records.map(record => record.get('u').properties);
            result.result = `success`;
            result.statusCode = 200;
            result.message = id ? `200: User found with id ${id}` : '200: Users found';
            result.id = id || '';
            result.data = users;
            return result;
        }
    }
    catch (err) {
        const errorMessage = id ? `500: failed to get user ${id}: ${err}` : `500: failed to get users: ${err}`;
        console.error(errorMessage);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${errorMessage}`;
        return result;
    }
    finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const db_1 = __importDefault(require("../db"));
const getUserById = async (id) => {
    console.log(`opening neo4j session\n`);
    const session = db_1.default.session();
    try {
        console.log(`session opened, getting user ${id}\n`);
        const result = await session.run('MATCH (u:User {id: $id}) RETURN u', { id });
        const user = result.records[0].get('u').properties;
        console.log(user);
        console.log(`User ${user.username} found with email ${user.email} and access rights of ${user.userType}\n`);
        return {
            result: `User ${user.username} found with email ${user.email} and access rights of ${user.userType}`,
            user: true
        };
    }
    catch (err) {
        console.error(`failed to get user ${id}: ${err}`);
        return {
            result: `Error: ${err}`,
            user: false
        };
    }
    finally {
        await session.close();
        console.log(`neo4j session closed\n`);
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=getUSerById.js.map
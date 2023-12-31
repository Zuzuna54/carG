"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_1 = require("../neo4jCalls/userCalls/createUser");
const getUserByUsername_1 = require("../neo4jCalls/userCalls/getUserByUsername");
const uuid_1 = require("uuid");
const createUserHandler = async (username, email, password, userType) => {
    console.log(`initiating createUserHandler \n`);
    console.log(`Validating that name, email, password and userType are provided in the request body\n`);
    if (!username || !email || !password || !userType) {
        console.error('Error: name, email, password and userType are required parameters.\n');
        return `Error: name, email, password and userType are required parameters.`;
    }
    console.log(`Validating that the password is valid\n`);
    if (password.length < 8) {
        console.error('Error: password must be at least 8 characters long.\n');
        return `Error: password must be at least 8 characters long.`;
    }
    try {
        console.log(`Checking if the user already exists \n`);
        const userCheck = await (0, getUserByUsername_1.getUserByUsername)(username);
        if (userCheck.user) {
            console.error('Error: Username already exists');
            return `Error: Username already exists`;
        }
        console.log(`Generating an Unique ID for the user\n`);
        const id = (0, uuid_1.v4)();
        console.log(`id: ${id}`);
        console.log(`Calling createUser neo4j call\n`);
        const user = await (0, createUser_1.createUser)(id, username, email, password, userType);
        console.log(`result: ${user.result}`);
        return user.result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return `Error: ${error}`;
    }
};
exports.default = createUserHandler;
//# sourceMappingURL=createUserHandler.js.map
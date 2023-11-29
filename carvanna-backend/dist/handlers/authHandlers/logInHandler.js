"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserByUsername_1 = require("src/neo4jCalls/userCalls/getUserByUsername");
const logInHandler = async (username, password) => {
    console.log(`Validating that name, email, password and userType are provided in the request body\n`);
    if (!username || !password) {
        console.error('Error: name, email, password and userType are required parameters.\n');
        return `Error: name, email, password and userType are required parameters.`;
    }
    try {
        console.log(`Getting the user by username \n`);
        const user = await (0, getUserByUsername_1.getUserByUsername)(username);
        if (!user.result) {
            console.error('Error: Username does not exist');
            return `Error: Username does not exist`;
        }
        console.log(`Checking if the password is valid\n`);
        const validPassword = await bcrypt_1.default.compare(password, user.user.password);
        if (!validPassword) {
            console.error('Error: Invalid password');
            return `Error: Invalid password`;
        }
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            console.error('Error: TOKEN_SECRET environment variable is not set');
            return 'Error: TOKEN_SECRET environment variable is not set';
        }
        console.log(`Creating and assigning a token\n`);
        const token = jsonwebtoken_1.default.sign({ user: user }, tokenSecret);
        console.log(`token: ${token}`);
        return token;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return `Error: ${error}`;
    }
};
exports.default = logInHandler;
//# sourceMappingURL=logInHandler.js.map
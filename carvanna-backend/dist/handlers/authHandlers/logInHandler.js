"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserByUsername_1 = require("../../neo4jCalls/userCalls/getUserByUsername");
const updateUser_1 = require("../../neo4jCalls/userCalls/updateUser");
const User_1 = require("../../entities/User");
const logInHandler = async (username, password) => {
    console.log(`\n\nRunning logInHandler.ts\n\n`);
    const user = new User_1.User('', '', '', '', '', '', '', '', '', '', '', '', '', '', "");
    try {
        console.log(`Creating a new Token object\n`);
        console.log(`Validating that password and username are provided in the request body\n`);
        if (!username || !password) {
            console.error('Error: 409 Password and username are required parameters.\n');
            user.error = `Error: 409 name, email, password and userType are required parameters.`;
            return user;
        }
        console.log(`Getting the user by username \n`);
        const result = await (0, getUserByUsername_1.getUserByUsername)(username.toLowerCase());
        if (result.statusCode !== 200) {
            console.error('Error: 404 Username does not exist');
            user.error = `Error: 404 Username does not exist`;
            return user;
        }
        console.log(`user returned data: ${JSON.stringify(result.data)}`);
        console.log(`Checking if the password is valid\n`);
        const validPassword = await bcrypt_1.default.compare(password, result.data.password);
        console.log(`validPassword: ${validPassword}`);
        if (!validPassword) {
            console.error('Error: 401 Invalid password');
            user.error = `Error: 401 Invalid password`;
            return user;
        }
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            console.error('Error: 500 TOKEN_SECRET environment variable is not set');
            user.error = `Error: 500 TOKEN_SECRET environment variable is not set`;
            return user;
        }
        console.log(`Creating and assigning a token\n`);
        const signature = {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            userType: result.data.userType,
            lastLogIn: Date.now()
        };
        const token = jsonwebtoken_1.default.sign({ user: signature }, tokenSecret);
        console.log(`Creating and assigning a refresh token\n`);
        const refreshToken = jsonwebtoken_1.default.sign({ user: { username: result.data.username, lastLogIn: Date.now() } }, tokenSecret);
        user.id = result.data.id;
        user.username = result.data.username;
        user.email = result.data.email;
        user.userType = result.data.userType;
        user.createdAt = result.data.createdAt;
        user.lastLogin = new Date().toISOString();
        user.createdBy = result.data.createdBy;
        user.acessToken = token;
        user.refreshToken = refreshToken;
        console.log(`Updating the last login time\n`);
        const updateLastLogin = await (0, updateUser_1.updateUser)(user);
        if (updateLastLogin.statusCode !== 200) {
            console.error(`Error: 500 ${updateLastLogin.message} 500 Failed to update last login time`);
            user.error = `Error: 500  ${updateLastLogin.message} Failed to update last login time`;
            return user;
        }
        return user;
    }
    catch (error) {
        console.error('Error: 500 logging in user:', error);
        user.error = `Error: 500 logging in user: ${error}`;
        return user;
    }
};
exports.default = logInHandler;
//# sourceMappingURL=logInHandler.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserByUsername_1 = require("../../neo4jCalls/userCalls/getUserByUsername");
const User_1 = require("../../entities/User");
const logInHandler = async (username, password) => {
    console.log(`\n\nRunning logInHandler.ts\n\n`);
    try {
        console.log(`Creating a new Token object\n`);
        const user = new User_1.User();
        console.log(`Validating that password and username are provided in the request body\n`);
        if (!username || !password) {
            console.error('Error: 409 Password and username are required parameters.\n');
            user.error = `Error: 409 name, email, password and userType are required parameters.`;
            return user;
        }
        console.log(`Getting the user by username \n`);
        const userReturned = await (0, getUserByUsername_1.getUserByUsername)(username);
        if (!userReturned.result) {
            console.error('Error: 404 Username does not exist');
            user.error = `Error: 404 Username does not exist`;
            return user;
        }
        console.log(`Checking if the password is valid\n`);
        const validPassword = await bcrypt_1.default.compare(password, userReturned.user.password);
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
            id: user.id,
            username: user.username,
            email: user.email,
            userType: userReturned.user.userType
        };
        const token = jsonwebtoken_1.default.sign({ user: signature }, tokenSecret);
        user.id = userReturned.user.id;
        user.username = userReturned.user.username;
        user.email = userReturned.user.email;
        user.password = userReturned.user.password;
        user.userType = userReturned.user.userType;
        user.createdAt = userReturned.user.createdAt;
        user.lastLogin = userReturned.user.lastLogin;
        user.createdBy = userReturned.user.createdBy;
        user.token = token;
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        const user = new User_1.User();
        user.error = `Error creating user: ${error}`;
        return user;
    }
};
exports.default = logInHandler;
//# sourceMappingURL=logInHandler.js.map
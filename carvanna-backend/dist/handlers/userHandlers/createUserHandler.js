"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_1 = require("../../neo4jCalls/userCalls/createUser");
const getUserByUsername_1 = require("../../neo4jCalls/userCalls/getUserByUsername");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../entities/User");
const context_1 = require("../../contextInterface/context");
const constants_1 = require("../../constants/constants");
const utils_1 = require("../../utils/utils");
const createUserHandler = async (username, email, password, userType, compnayId, jwtToken) => {
    console.log(`initiating createUserHandler \n`);
    try {
        console.log(`Authorization check with JWT\n`);
        if (!jwtToken) {
            console.error('Error: 498 No JWT token provided');
            return `Error: 498 No JWT token provided `;
        }
        console.log(`Decoding the JWT token\n`);
        const user = (0, context_1.decodeToken)(jwtToken);
        if ((user === null || user === void 0 ? void 0 : user.userType) !== constants_1.SUPER_ADMIN) {
            console.error('Error: 401 User not authorized to create users');
            return `Error: 401 User not authorized to create users`;
        }
        console.log(`Validating that the email is valid\n`);
        const emailValidated = (0, utils_1.validateEmail)(email);
        if (!emailValidated) {
            console.error('Error: 501 Invalid email');
            return `Error: 501 Invalid email`;
        }
        console.log(`Validating that name, email, password and userType are provided in the request body\n`);
        if (!username || !email || !password || !userType) {
            console.error('Error: 400 name, email, password and userType are required parameters.\n');
            return `Error: 400 name, email, password and userType are required parameters.`;
        }
        console.log(`Validating that the password is valid\n`);
        if (password.length < 8) {
            console.error('Error: 1001 password must be at least 8 characters long.\n');
            return `Error: 1001 password must be at least 8 characters long.`;
        }
        console.log(`Checking if the user already exists \n`);
        const userCheck = await (0, getUserByUsername_1.getUserByUsername)(username);
        if (userCheck.result) {
            console.error('Error: 409 Username already exists');
            return `Error: 409 Username already exists`;
        }
        console.log(`Generating an Unique ID for the user\n`);
        const id = (0, uuid_1.v4)();
        console.log(`Encrypting the password\n`);
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        console.log(`hashedPassword: ${hashedPassword}`);
        const userTobeCreated = new User_1.User();
        userTobeCreated.username = username;
        userTobeCreated.email = email;
        userTobeCreated.password = hashedPassword;
        userTobeCreated.userType = userType;
        userTobeCreated.id = id;
        userTobeCreated.createdAt = new Date().toISOString();
        userTobeCreated.lastLogin = new Date().toISOString();
        userTobeCreated.createdBy = user.username;
        userTobeCreated.companyId = compnayId;
        userTobeCreated.status = constants_1.ACTIVE;
        userTobeCreated.token = '';
        userTobeCreated.error = '';
        console.log(`Calling createUser neo4j call\n`);
        const userCreated = await (0, createUser_1.createUser)(userTobeCreated);
        return userCreated.result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return `Error: ${error}`;
    }
};
exports.default = createUserHandler;
//# sourceMappingURL=createUserHandler.js.map
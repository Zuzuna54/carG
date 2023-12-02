"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_1 = require("../../neo4jCalls/userCalls/createUser");
const getUserByUsername_1 = require("../../neo4jCalls/userCalls/getUserByUsername");
const getCompany_1 = require("../../neo4jCalls/compnayCalls/getCompany");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../entities/User");
const genericReturn_1 = require("../../entities/genericReturn");
const constants_1 = require("../../constants/constants");
const utils_1 = require("../../utils/utils");
const createComanyAdminHandler = async (username, email, password, userType, compnayId, jwtToken) => {
    console.log(`initiating createComanyAdminHandler \n`);
    const result = new genericReturn_1.GenericReturn('', 0, '', '', '');
    try {
        console.log(`Authorization check with JWT\n`);
        if (!jwtToken) {
            console.error('Error: 498 No JWT token provided');
            result.result = `failed`;
            result.statusCode = 498;
            result.message = `Error 498: No JWT token provided`;
            return result;
        }
        console.log(`Decoding the JWT token\n`);
        const user = (0, utils_1.decodeToken)(jwtToken);
        console.log(`Validating session duration\n`);
        const sessionValidated = (0, utils_1.validateSession)(user === null || user === void 0 ? void 0 : user.lastLogIn);
        if (!sessionValidated) {
            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;
            return result;
        }
        console.log(`Validating that the user is a super admin or a company admin\n`);
        if ((user === null || user === void 0 ? void 0 : user.userType) !== constants_1.SUPER_ADMIN && (user === null || user === void 0 ? void 0 : user.userType) !== constants_1.COMPANY_ADMIN) {
            console.error('Error: 401 User not authorized to create users');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create users`;
            return result;
        }
        console.log(`Validating that the user is not creating another company admin\n`);
        if ((user === null || user === void 0 ? void 0 : user.userType) === constants_1.COMPANY_ADMIN && userType === constants_1.COMPANY_ADMIN) {
            console.error('Error: 401 User not authorized to create another company admin');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create another company admin`;
            return result;
        }
        console.log(`Validating that name, email, password and userType are provided in the request body\n`);
        if (!username || !email || !password || !userType || !compnayId) {
            console.error('Error: 400 username, email, password, userType and companyId are required parameters.\n');
            console.error(`username: ${username} email: ${email} password: ${password} userType: ${userType} companyId: ${compnayId}\n`);
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 username, email, password, userType and companyId are required parameters.`;
            return result;
        }
        console.log(`Validating that the username is valid\n`);
        const usernameValidated = (0, utils_1.validateUsername)(username);
        if (!usernameValidated) {
            console.error('Error: 502 Invalid username');
            result.result = `failed`;
            result.statusCode = 502;
            result.message = `Error: 502 Invalid username`;
            return result;
        }
        console.log(`Validating that the password is valid\n`);
        const passwordValidated = (0, utils_1.validatePassword)(password);
        if (!passwordValidated) {
            console.error('Error: 503 Invalid password');
            result.result = `failed`;
            result.statusCode = 503;
            result.message = `Error: 503 Invalid password`;
            return result;
        }
        console.log(`Validating that the email is valid\n`);
        const emailValidated = (0, utils_1.validateEmail)(email);
        if (!emailValidated) {
            console.error('Error: 501 Invalid email');
            result.result = `failed`;
            result.statusCode = 501;
            result.message = `Error: 501 Invalid email`;
            return result;
        }
        console.log(`Validating that the userType is valid\n`);
        const userTypeValidated = (0, utils_1.validateUserType)(userType);
        if (!userTypeValidated) {
            console.error('Error: 504 Invalid userType');
            result.result = `failed`;
            result.statusCode = 504;
            result.message = `Error: 504 Invalid userType`;
            return result;
        }
        console.log(`Validating that the Company exists\n`);
        const company = await (0, getCompany_1.getCompany)(compnayId);
        if (company.statusCode !== 200) {
            console.error(`Error: 404 Auction ${compnayId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Auction ${compnayId} not found`;
            return result;
        }
        console.log(`Checking if the user already exists \n`);
        const userCheck = await (0, getUserByUsername_1.getUserByUsername)(username);
        if (userCheck.statusCode === 200) {
            console.error('Error: 409 Username already exists');
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Username already exists`;
            return result;
        }
        console.log(`Generating an Unique ID for the user\n`);
        const id = (0, uuid_1.v4)();
        console.log(`Encrypting the password\n`);
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        console.log(`hashedPassword: ${hashedPassword}`);
        const userTobeCreated = new User_1.User(id, username, email, hashedPassword, userType, new Date().toISOString(), '', new Date().toISOString(), '', user.username, compnayId, constants_1.ACTIVE, '', '');
        console.log(`Calling createUser neo4j call\n`);
        const userCreated = await (0, createUser_1.createUser)(userTobeCreated);
        if (userCreated.statusCode !== 200) {
            console.error(`Error: 500 ${userCreated.message} user could not be created\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${userCreated.message} user could not be created`;
            return result;
        }
        console.log(`User ${userTobeCreated.id} created successfully\n`);
        result.id = user.id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = userCreated.result;
        return result;
    }
    catch (error) {
        console.error('Error creating user:', error);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 ${error}`;
        return result;
    }
};
exports.default = createComanyAdminHandler;
//# sourceMappingURL=createUserHandler.js.map
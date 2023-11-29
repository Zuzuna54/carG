"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logInUser = async (username, password) => {
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
    }
    catch (error) {
        console.error('Error creating user:', error);
        return `Error: ${error}`;
    }
};
exports.default = createUserHandler;
//# sourceMappingURL=login.js.map
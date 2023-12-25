"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const createUserHandler_1 = __importDefault(require("../handlers/userHandlers/createUserHandler"));
const logInHandler_1 = __importDefault(require("../handlers/authHandlers/logInHandler"));
const refreshAcessTokenHandler_1 = __importDefault(require("../handlers/authHandlers/refreshAcessTokenHandler"));
const User_1 = require("../entities/User");
const genericReturn_1 = require("../entities/genericReturn");
let UserResolver = class UserResolver {
    hello() {
        return 'Hello World!';
    }
    createUser(username, email, password, userType, companyId, context) {
        var _a;
        const jwtToken = (_a = context.req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        return (0, createUserHandler_1.default)(username, email, password, userType, companyId, jwtToken);
    }
    logInUser(username, password, context) {
        return (0, logInHandler_1.default)(username, password, context);
    }
    refreshAccessToken(refreshToken) {
        return (0, refreshAcessTokenHandler_1.default)(refreshToken);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => genericReturn_1.GenericReturn),
    __param(0, (0, type_graphql_1.Arg)("username", () => String)),
    __param(1, (0, type_graphql_1.Arg)("email", () => String)),
    __param(2, (0, type_graphql_1.Arg)("password", () => String)),
    __param(3, (0, type_graphql_1.Arg)("userType", () => String)),
    __param(4, (0, type_graphql_1.Arg)("companyId", () => String)),
    __param(5, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("username", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logInUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => genericReturn_1.GenericReturn),
    __param(0, (0, type_graphql_1.Arg)("refreshToken", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "refreshAccessToken", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
//# sourceMappingURL=userResolver.js.map
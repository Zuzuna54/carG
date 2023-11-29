"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("./resolvers/userResolver");
const main = async () => {
    const appoloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [userResolver_1.UserResolver],
            validate: false
        }),
    });
    await appoloServer.start();
    const app = (0, express_1.default)();
    appoloServer.applyMiddleware({ app });
    app.listen(8000, () => {
        console.log(`Server is running on port ${8000}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("./resolvers/userResolver");
const companyResolver_1 = require("./resolvers/companyResolver");
const auctionResolver_1 = require("./resolvers/auctionResolver");
const stateResolver_1 = require("./resolvers/stateResolver");
const locationResolver_1 = require("./resolvers/locationResolver");
const priceResolver_1 = require("./resolvers/priceResolver");
const carResolver_1 = require("./resolvers/carResolver");
const calcResolver_1 = require("./resolvers/calcResolver");
const main = async () => {
    const appoloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                userResolver_1.UserResolver,
                companyResolver_1.CompanyResolver,
                stateResolver_1.StateResolver,
                auctionResolver_1.AuctionResolver,
                locationResolver_1.LocationResolver,
                priceResolver_1.PriceResolver,
                carResolver_1.CarResolver,
                calcResolver_1.CalcResolver
            ],
            validate: false
        }),
        context: ({ req }) => ({ req })
    });
    await appoloServer.start();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    appoloServer.applyMiddleware({ app });
    const port = process.env.PORT || "8002";
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map
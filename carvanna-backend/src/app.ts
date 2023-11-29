require('dotenv').config();
import 'reflect-metadata';
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';

const main = async () => {

    const appoloServer: ApolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false
        }),
        // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    })


    await appoloServer.start();
    const app: Express = express();

    appoloServer.applyMiddleware({ app });
    const port: string | undefined = process.env.PORT || "8002";

    app.listen(port, () => {

        console.log(`Server is running on port ${port}`);
    });
};


main().catch((err) => {
    console.error(err);
});

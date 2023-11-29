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

    app.listen(8001, () => {
        console.log(`Server is running on port ${8001}`);
    });
};


main().catch((err) => {
    console.error(err);
});
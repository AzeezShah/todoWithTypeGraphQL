import "reflect-metadata";
import express, { Express } from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const main = async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })
    await apolloServer.start();

    const app: Express = express();

    apolloServer.applyMiddleware({app});

    app.get("/", (_req, res) =>{
        res.send("Hello world!")
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, ()=>console.log(`server started on port: ${PORT}`));
}

main().catch((err)=>console.error(err));

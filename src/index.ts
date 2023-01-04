import "reflect-metadata";
import express, { Express } from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import { Task } from "./entities/Task";

const main = async () => {

    const conn = await createConnection({
        type: "postgres",
        database: "todolist-graphql-db",
        entities: [Task],
        logging: true,
        synchronize: true,
        username: "postgres",
        password: "bismillah",
        port: 5431
    });

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

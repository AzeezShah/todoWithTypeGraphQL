import express, { Express } from "express";

const main = async () => {
    const app: Express = express();

    app.get("/", (_req, res) =>{
        res.send("Hello world!")
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, ()=>console.log(`server started on port: ${PORT}`));
}

main().catch((err)=>console.error(err));


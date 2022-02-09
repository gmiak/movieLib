import * as Express from "express"; 

const app : Express.Express = Express();

app.get("/", (req: Express.Request, res : Express.Response) => {
    res.send("Hello World");
});

app.listen(8080);
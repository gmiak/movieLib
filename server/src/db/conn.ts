import { createConnection, Connection } from "mongoose";

export const conn : Promise<Connection> = Promise.resolve(createConnection("mongodb+srv://gmiak:XXXXXXXXX@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"));
import { createConnection, Connection } from "mongoose";

export const conn : Promise<Connection> = Promise.resolve(createConnection("mongodb+srv://gmiak:suede2011@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"));
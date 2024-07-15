import mongoose from "mongoose";
import env from 'dotenv';

env.config();

export function connectMongodb() {
    mongoose
        .connect(process.env.MONGODB_URI + `/${process.env.DBNAME}`)
        .then(() => console.log("Connected with the database"))
        .catch((err) => console.log(`Failed to connect with database: ${err}`));
}

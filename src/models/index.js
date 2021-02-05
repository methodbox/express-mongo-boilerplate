import mongoose from "mongoose";
import Example from "./exampleModel";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    //  mongo db user & pass from .env
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
  });
};

const models = { Example };

export { connectDb };
export default models;

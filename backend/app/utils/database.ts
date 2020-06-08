import mongoose from 'mongoose';

mongoose.set("debug", true);

const dbConnection = async () => await mongoose.connect("mongodb+srv://ams-sii-8orgd.mongodb.net/test",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        auth: { user: process.env.DATABASE_USERNAME as string, password: process.env.DATABASE_PASSWORD as string }
    }
);

export { mongoose };
export default dbConnection;
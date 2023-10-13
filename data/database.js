import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: "unihub", useNewUrlParser: true, useUnifiedTopology: true})
    .then((c) => {
        console.log(`Database connected with ${c.connection.host}`);
    })
    .catch(err => console.log("Error connecting"));
}
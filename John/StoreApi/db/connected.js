import mongoose from "mongoose";

const connectDb = async(url) => {
    try {
        await mongoose.connect(url)
        console.log("Connected To The Db..");
        
    } catch (error) {
        console.log("Error connecting to DB:", error.message);
        process.exit(1);
    }
};


export default connectDb
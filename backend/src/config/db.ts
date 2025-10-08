import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Mongoose in the House baby!!");
    } catch(error) {
        console.error("DB Error: ", error);
        process.exit(1);
    }
};

export default connectDB;
import mongoose from "mongoose";

const connectDb =async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB')

    } catch (error) {
        console.log(`Error connecting to the database; ${error.message}`);
        process.exit(1)
    }
}

export default connectDb;
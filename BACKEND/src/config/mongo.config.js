import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); 
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDb;

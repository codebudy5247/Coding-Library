import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shekharaditya807:vSPBR3pAMvk7SkaI@cluster0.rs7vo.mongodb.net/agree?retryWrites=true&w=majority"
    );
    console.log("Database connected...");
  } catch (error: any) {
    console.log("MongoDb error", error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;

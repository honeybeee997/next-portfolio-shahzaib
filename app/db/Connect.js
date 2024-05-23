import mongoose from "mongoose";

const url = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error.message);
  }
};
export default ConnectDB;

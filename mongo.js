import mongoose from "mongoose";

export default () => {
  return mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.nnd1d.mongodb.net/applemania_bot"
  );
};

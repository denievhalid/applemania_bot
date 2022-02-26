import mongoose from "mongoose";

const schema = new mongoose.Schema({
  telegramId: {
    type: String,
  },
  phone: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", schema);

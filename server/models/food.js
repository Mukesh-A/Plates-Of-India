import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  rate:Number,
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const FoodModel = mongoose.model("Food", foodSchema);

export default FoodModel;

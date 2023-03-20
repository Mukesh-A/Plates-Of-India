import mongoose from "mongoose";
import FoodModel from "../models/food.js";

export const createFood = async (req, res) => {
  const food = req.body;
  const newFood = new FoodModel({
    ...food,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(404).json({ message: `something went wrong: ${err}` });
  }
};

export const getFoods = async (req, res) => {
  try {
    const data = await FoodModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};
export const getFood = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await FoodModel.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};
export const getPostByUser = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "user doesn't exist" });
  }

  const userFoods = await FoodModel.find({ creator: id });
  res.status(200).json(userFoods);
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Post not exit" });
    }
    await FoodModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Post not exit" });
    }
    const updatedPost = {
      title,
      description,
      creator,
      imageFile,
      tags,
      _id: id,
    };
    await FoodModel.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
export const getPostBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await FoodModel.find({ title });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

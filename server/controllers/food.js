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

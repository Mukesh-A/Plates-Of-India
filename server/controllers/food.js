import express from "express";
import FoodModel from "../models/food";

export const createFood = async (req, res) => {
  const food = req.body;
  const newFood = new FoodModel({
    ...food,
    createdAt: new Date().toISOString(),
  });
  try {
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

import express from "express";
import { createFood, getFood, getFoods } from "../controllers/food.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//when ever a new post is created auth middelware has to run to get the user id and then create the post
router.post("/", auth, createFood);
router.get("/", getFoods);
router.get("/:id", getFood);

export default router;

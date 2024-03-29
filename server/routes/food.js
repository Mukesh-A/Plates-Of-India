import express from "express";
import {
  createFood,
  getFood,
  getPostByUser,
  getFoods,
  deletePost,
  updatePost,
  getPostBySearch,
  getPostByTag,
  getRelatedPosts,
  likePost,
} from "../controllers/food.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//when ever a new post is created auth middelware has to run to get the user id and then create the post
router.get("/search", getPostBySearch);
router.get("/tag/:tag", getPostByTag);
router.post("/relatedPosts", getRelatedPosts);
router.get("/", getFoods);
router.get("/:id", getFood);
router.post("/", auth, createFood);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.get("/userFoods/:id", auth, getPostByUser);
router.patch("/like/:id", auth, likePost);

export default router;

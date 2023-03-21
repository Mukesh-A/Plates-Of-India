import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

//Axios interceptors are functions that are called before a request is sent and after a response is received.
//https://geshan.com.np/blog/2022/12/axios-interceptors/#:~:text=Interceptors%20can%20be%20used%20to,%2C%20transform%20the%20response%2C%20etc.

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    /// basically this is for sending the user data to backend middleware
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
    // console.log("requeste", req);
  }
  return req;
});

export const signIn = (formdata) => API.post("/users/signin", formdata);
export const signUp = (formdata) => API.post("/users/signup", formdata);

//Tourdata
export const createFood = (foodData) => API.post("/post", foodData);
export const getFoods = (page) => API.get(`/post?page=${page}`);
export const getPost = (id) => API.get(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const updatePost = (updatedPostData, id) =>
  API.patch(`/post/${id}`, updatedPostData);
export const getPostByUser = (userId) => API.get(`/post/userFoods/${userId}`);

//search

export const getPostBySearch = (searchQuery) =>
API.get(`/post/search?searchQuery=${searchQuery}`);
export const getPostByTag = (tag) => API.get(`/post/tag/${tag}`);
export const getRelatedPosts = (tags) => API.post(`/post/relatedPosts`, tags);
export const likePost = (id) => API.patch(`/post/like/${id}`);

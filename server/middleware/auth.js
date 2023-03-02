import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
const secret = "food";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("token", token);
    const isCustomAuth = token.length < 500; //if its a normal auth then the token length is less than 500, if the token length is more than 500 then it is a google auth
    let decodeData;
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, secret);
      // console.log("decode", decodeData);
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      const googleId = decodeData?.sub.toString();
      const user = await userModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
export default auth;

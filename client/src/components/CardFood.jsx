import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../redux/features/foodSlice";
export const CardFood = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const userId = user?.user?._id;

  const dispatch = useDispatch();
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="heart" />
          &nbsp;
          {likes.length > 1 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people liked`}
            >
              {" "}
              {likes.length}Likes
            </MDBTooltip>
          ) : (
            `${likes.length}Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon fas icon="heart" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="heart" />
        &nbsp; Like
      </>
    );
  };
  const handelLikes = () => {
    dispatch(likePost({ _id }));
  };
  return (
    <MDBCardGroup>
      <MDBCard
        className="h-60 mt-2 d-sm-flex"
        style={{ minWidth: "18rem", maxWidth: "40rem", margin: "20px" }}
      >
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "200px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link to={`/post/tag/${tag}`} key={index}>
              #{tag}{" "}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={!user?.user ? null : handelLikes}
          >
            {!user?.user ? (
              <MDBTooltip title="Please login" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
            {/* <Likes /> */}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start"> {title} </MDBCardTitle>
          <MDBCardText className="text-start">
            {" "}
            {excerpt(description, 45)}
            <Link to={`/post/${_id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

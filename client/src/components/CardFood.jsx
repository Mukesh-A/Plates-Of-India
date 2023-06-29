import React, { useEffect, useState } from "react";
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

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import  PlaceholderImage  from "../assets/logos.png";
export const CardFood = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
  foods
}) => {
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const { loading } = useSelector((state) => ({
    ...state.food,
  }));

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(loading);
  //   }, 2000);
  // }, []);

  const userId = user?.user?._id;

  const dispatch = useDispatch();
  // console.log("loading", loading);
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
        style={{ maxWidth: "30rem", margin: "10px"}}
      >
        {loading ? (
          <Skeleton height={200} />
        ) : (
          <LazyLoadImage
            src={imageFile}
            
            alt={title}
            
            position="top"
           
            style={{ maxWidth: "100%", height: "200px" }}
            
          />
        )}
        {loading ? <Skeleton height={20} width={200} style={{margin:"10px"}}/> : <div className="top-left">{name}</div>}
        {loading ? <Skeleton height={20} width={150} style={{margin:"10px"}}/> :<span className="text-start tag-card">
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
        </span>}
        {loading ? <Skeleton height={20} width={200} style={{margin:"10px"}}/> :<MDBCardBody>
          <MDBCardTitle className="text-start"> {title} </MDBCardTitle>
          <MDBCardText className="text-start">
            {" "}
            {excerpt(description, 45)}
            <Link to={`/post/${_id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>}
      </MDBCard>
    </MDBCardGroup>
  );
};

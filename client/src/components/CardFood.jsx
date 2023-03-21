import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

export const CardFood = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
}) => {
  // const excerpt = (str) => {
  //   if (str.length > 45) {
  //     str = str.substring(0, 45) + "...";
  //   }
  //   return str;
  // };
  return (
    <MDBCardGroup>
      <MDBCard className="h-60 mt-2 d-sm-flex" style={{minWidth:"18rem", maxWidth: "40rem",margin:"20px" }}>
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
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start"> {title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {" "}
            {excerpt(description,45)}
            <Link to={`/post/${_id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPost } from "../redux/features/foodSlice.js";
import moment from "moment";
// import logo from "../assets/logos.png";
export const SinglePost = () => {
  const dispatch = useDispatch();
  const { food } = useSelector((state) => ({ ...state.food }));

  const { id } = useParams();
  // console.log("mu", id);
  useEffect(() => {
    if (id) {
      // console.log(id);
      dispatch(getPost(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer style={{ marginTop: "100px" }}>
        {/* {console.log(food)} */}
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "auto", maxHeight: "600px", margin: "0 auto" }}
            src={food?.imageFile}
            alt={food?.title}
          />
          <MDBCardBody>
            <h3>{food.title}</h3>
            <span>
              <p className="text-start foodName">Posted Bt:{food?.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {food && food.tags && food?.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start ">
              <MDBIcon
                style={{ padding: "4px" }}
                far
                icon="calendar-alt"
                size="sm"
              />
              <small className="text-muted ">
                {moment(food?.createdAt).fromNow()}
              </small>
              <MDBCardText className="lead mb-0 text-start">
                {food?.description}
              </MDBCardText>
            </MDBCardText>
          </MDBCardBody>
          {/* </MDBCardImage> */}
        </MDBCard>
      </MDBContainer>
    </>
  );
};

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

import { getPost, getRelatedPosts } from "../redux/features/foodSlice.js";
import moment from "moment";
import { RelatedPosts } from "../components/RelatedPosts.jsx";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import logo from "../assets/logos.png";
export const SinglePost = () => {
  const dispatch = useDispatch();
  const { food, relatedPosts } = useSelector((state) => ({ ...state.food }));

  const { id } = useParams();
  const tags = food?.tags;
 

  useEffect(() => {
    tags && dispatch(getRelatedPosts(tags));
  }, [tags]);
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
        <MDBCard
          className="mb-3 mt-2"
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          {!food?.imageFile ? (
            <Skeleton
              height={400}
              width={700}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          ) : (
            <MDBCardImage
              position="top"
              style={{ maxHeight: "600px", margin: "0 auto" }}
              src={food?.imageFile}
              alt={food?.title}
            />
          )}
          <MDBCardBody>
            <h3>{food.title || <Skeleton width={500} />}</h3>
            <span>
              <p className="text-start foodName">
                Posted Bt:{food?.name || <Skeleton width={200} />}
              </p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {(food &&
                  food.tags &&
                  food?.tags.map((item) => `#${item} `)) || (
                  <Skeleton width={200} />
                )}
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
                {moment(food?.createdAt).fromNow() || <Skeleton width={200} />}
              </small>
              <span className="text-start p-4 fw-bold">
                Approx: ₹{food?.rate || <Skeleton width={200} />}
              </span>
              <MDBCardText className="lead mb-0 text-start">
                {food?.description || <Skeleton height={70} />}
              </MDBCardText>
            </MDBCardText>
          </MDBCardBody>
          {/* </MDBCardImage> */}
          <RelatedPosts relatedPosts={relatedPosts} postId={id} />
        </MDBCard>
      </MDBContainer>
    </>
  );
};

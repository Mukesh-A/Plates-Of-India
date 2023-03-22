import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  getFoods,
  searchPosts,
  setCurrentPage,
} from "../redux/features/foodSlice";
import { CardFood } from "../components/CardFood";
import Spinner from "../components/Spinner";
import { Pagination } from "../components/Pagination";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { foods, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.food,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods(currentPage));
  }, [currentPage]);

  //search
  const handelSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchPosts(search));
      navigate(`/post/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };
  // console.log(foods);
  // if (foods === 0) {

  // }
  return (
    <div
      style={{
        margin: "30px auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        // display:"flex",
        // gap:"50px"
      }}
    >
      {/* search */}
      <form className="d-flex input-group  " onSubmit={handelSubmit}>
        <div
          className=""
          style={{
            width: "500px",
            margin: "0 auto",
            marginTop:"70px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            // border: "1px solid ",
            borderRadius: "25px",
            padding: "10px",
            boxShadow: "rgba(0, 145, 255, 0.3) 0px 1px 42px 15px, rgba(0, 0, 0, 0.15) 0px 1px 3px 1px"
          }}
        >
          <input
            type="text"
            className="form-control "
            placeholder="Search by Title ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ height: "50px", border: "none", outline: "none" }}
          />
          <MDBIcon fas icon="search" />
        </div>
      </form>

      <MDBRow className="mt-5">
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-col-1 row-cols-md-3 g-2">
              {foods !== 0 ? (
                foods?.map((item, index) => <CardFood key={index} {...item} />)
              ) : (
                <MDBTypography
                  className="text-center mb-0"
                  style={{ margin: "0 auto" }}
                  tag="h2"
                >
                  No post found
                </MDBTypography>
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {!loading && foods !== 0 && (
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, setCurrentPage } from "../redux/features/foodSlice";
import { CardFood } from "../components/CardFood";
import Spinner from "../components/Spinner";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const { foods, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.food,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods(currentPage));
  }, [currentPage]);
  if (loading) {
    return <Spinner />;
  }
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
      <MDBRow className="mt-5">
        {foods.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Post.
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-col-1 row-cols-md-3 g-2">
              {foods &&
                foods?.map((item, index) => <CardFood key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        dispatch={dispatch}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

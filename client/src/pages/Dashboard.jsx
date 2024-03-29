import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, getPostByUser } from "../redux/features/foodSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userFoods, loading } = useSelector((state) => ({ ...state.food }));
  const userId = user?.user?._id;
  const dispatch = useDispatch();
  // console.log(userPosts);
  useEffect(() => {
    if (userId) {
      dispatch(getPostByUser(userId));
    }
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Post ?")) {
      dispatch(deletePost({ id, toast }));
    }
  };

  return (
    <div
      style={{
        // display:"flex",
        // flexDirection:"column",
        // justifyContent:"center",
        // alignItems:"center",
        margin:"auto",
        paddingTop: "120px",
        maxWidth: "600px",
        alignContent: "center",
      }}
    >
      {userFoods.length === 0 && (
        <h3>No tour available with the user: {user?.result?.name}</h3>
      )}

      {userFoods.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userFoods &&
        userFoods.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard className="mt-2 m-4">
              <MDBRow className="g-0"  >
                <MDBCol md="4" >
                  <MDBCardImage
                   
                    className="rounded "
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>

                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

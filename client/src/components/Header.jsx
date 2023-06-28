import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import logo from "../assets/logos.png";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchPosts } from "../redux/features/foodSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
export const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  // useselctore
  // i have removed the destructure use it if needed (state)=> ({...state.auth})
  const { user } = useSelector((state) => state.auth);
  // console.log({{user}});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const Logout = () => {
    dispatch(setLogout());
  };
  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   if (search) {
  //     dispatch(searchPosts(search));
  //     navigate(`/post/search?searchQuery=${search}`);
  //     setSearch("");
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
    <MDBNavbar className="navbar navbar-expand-lg fixed-top navbar-scroll"
      expand="lg"
      style={{  backdropFilter: blur("6px") }}
    >
      <MDBContainer>
        <MDBNavbarBrand
          style={{ color: "#00464D", fontWeight: "500", fontSize: "1.7rem", padding:0 }}
        >
          <img className="icon" src={logo} height="80" alt=""  />
          Plates of India
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#888" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.user._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addPost">
                    <p className="header-text">Add Food</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.user._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={Logout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}

            {user?.user?._id && (
              <h4
                style={{
                  marginTop: "5px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00464D",
                }}
              >
                {user?.user?.name}
              </h4>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

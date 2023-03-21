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

  return (
    <MDBNavbar
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "#f0e6ea", height: "70px" }}
    >
      <MDBContainer>
        <MDBNavbarBrand
          style={{ color: "#606080", fontWeight: "600", fontSize: "18px" }}
        >
          <img src={logo} height="60" alt="" loading="lazy" />
          Plates of India
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
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
                  color: "blue",
                }}
              >
                {user?.user?.name}
              </h4>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handelSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title ..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="" style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

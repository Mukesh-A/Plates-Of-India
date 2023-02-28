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

export const Header = () => {
  const [show, setShow] = useState(false);

  // useselctore
  // i have removed the destructure use it if needed (state)=> ({...state.auth})
  const { user } = useSelector((state) => state.auth);
  // console.log({{user}});

  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          <img src={logo} height="70" alt="" loading="lazy" />
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
                  <MDBNavbarLink href="/addFood">
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
               
                style={
                  {
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    color:"blue"
                  }
                }
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

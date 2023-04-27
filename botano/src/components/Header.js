import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logout from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="navbar bg-dark navbar-dark sticky-top" variant="light">
        <div className="container-fluid">
          <Navbar.Brand href="/">
            <h1 className="text-light">Botano</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                  <LinkContainer to="/profile" style={{ color: "#ffcba4" }}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    href="/"
                    style={{ color: "#ffcba4" }}
                  >
                    Logout
                  </NavDropdown.Item>
                  <LinkContainer
                    to="/subscription"
                    style={{ color: "#ffcba4" }}
                  >
                    <NavDropdown.Item>Subscription</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link className="btn" style={{ color: "#fffc00" }}>
                      <i className="fas fa-user"></i>Sign Up
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className="btn" style={{ color: "#fffc00" }}>
                      <i className="fas fa-user"></i>Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.admin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
}

export default Header;

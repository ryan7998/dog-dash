import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { useLocation, Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { QUERY_USER } from "../../utils/queries";

function Nav() {
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();
  
  // gets the current user details
  let dataUser = useQuery(QUERY_USER);
  const me = dataUser?.data?.user || {};

  useEffect(() => {
    // console.log(activeItem);
    const title = `Dog Dash- ${activeItem ? activeItem : (location ? location.pathname : '')}`;
    document.title = title;
 
  }, [location, me]);

  function showNavigation() {
    // console.log(Menu.Item);
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Dog Dash
          </Menu.Item>
          <Link to="/">
            <Menu.Item
              name="home"
              active={window.location.pathname === '/'}
              onClick={() => setActiveItem("home")}
              href="/"
            />
          </Link>

          {Auth.loggedIn() ? (
            <Link to="/myjobhistory">
              <Menu.Item
                name="my job history"
                active={window.location.pathname === '/myjobhistory'}
                onClick={() => setActiveItem("myjobhistory")}
              />
            </Link>
          ) : null}

          {Auth.loggedIn() && me.type == "Dog Owner" ? (
            <Link to="/cart">
              <Menu.Item
                name="cart"
                active={window.location.pathname === '/cart'}
                onClick={() => setActiveItem("cart")}
              />
            </Link>
          ) : null}

          {Auth.loggedIn() ? (
            <Menu.Menu position="right">
              <Link to="/profile">
                <Menu.Item
                  name={`${me.firstName} ${me.lastName}`}
                  active={window.location.pathname === '/profile'}
                  onClick={() => setActiveItem("profile")}
                />
              </Link>

              <Menu.Item name="logout" onClick={() => Auth.logout()} />
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Link to="/login">
                <Menu.Item
                  name="login"
                  active={window.location.pathname === "/login"}
                  onClick={() => setActiveItem("login")}
                />
              </Link>

              <Link to="/signup">
                <Menu.Item
                  name="signup"
                  active={window.location.pathname === "/signup"}
                  onClick={() => setActiveItem("signup")}
                />
              </Link>
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    );
  }

  return (
    <header>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;

import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { QUERY_USER } from "../../utils/queries";

function Nav() {
  const [activeItem, setActiveItem] = useState("home");
  // gets the current user details
  let data0 = useQuery(QUERY_USER);
  const me = data0?.data?.user || {};

  function showNavigation() {
    // console.log(me);
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Dog Dash
          </Menu.Item>
          <Link to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={() => setActiveItem("home")}
              href="/"
            />
          </Link>

          {Auth.loggedIn() ? (
            <Link to="/myjobhistory">
              <Menu.Item
                name="my job history"
                active={activeItem === "myjobhistory"}
                onClick={() => setActiveItem("myjobhistory")}
              />
            </Link>
          ) : null}

          {Auth.loggedIn() && me.type == "Dog Owner" ? (
            <Link to="/cart">
              <Menu.Item
                name="cart"
                active={activeItem === "cart"}
                onClick={() => setActiveItem("cart")}
              />
            </Link>
          ) : null}

          {Auth.loggedIn() ? (
            <Menu.Menu position="right">
              <Link to="/profile">
                <Menu.Item
                  name={`${me.firstName} ${me.lastName}`}
                  active={activeItem === "profile"}
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
                  active={activeItem === "login"}
                  onClick={() => setActiveItem("login")}
                />
              </Link>

              <Link to="/signup">
                <Menu.Item
                  name="signup"
                  active={activeItem === "signup"}
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

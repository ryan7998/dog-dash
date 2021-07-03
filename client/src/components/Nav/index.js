import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {useSelector, useDispatch} from 'react-redux';
import { useLocation, Link } from "react-router-dom";
import Auth from "../../utils/auth";
// import {UPDATE_TITLE} from '../../utils/actions';

import { Container, Menu } from "semantic-ui-react";
import { QUERY_USER } from "../../utils/queries";

function Nav() {

  const state = useSelector(state=>state);
  const {title} = state;

  const [activeItem, setActiveItem] = useState();
  const location = useLocation();
  
  // gets the current user details
  let dataUser = useQuery(QUERY_USER);
  const me = dataUser?.data?.user || {};

  useEffect(() => {
    const pageTitle = `Dog Dash- ${title}`;
    document.title = pageTitle;
 
  }, [title]);

  function showNavigation() {
    // console.log(Menu.Item);
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Dog Dash
          </Menu.Item>
            <Menu.Item
              as={Link}
              to='/'
              name="home"
              active={window.location.pathname === '/'}
              onClick={() => setActiveItem("home")}
            />
          {Auth.loggedIn() ? (
              <Menu.Item
                as={Link}
                to='/myjobhistory'
                name="my job history"
                active={window.location.pathname === '/myjobhistory'}
                onClick={() => setActiveItem("myjobhistory")}
              />
          ) : null}

          {Auth.loggedIn() && me.type == "Dog Owner" ? (
              <Menu.Item
                as={Link}
                to='/cart'
                name="cart"
                active={window.location.pathname === '/cart'}
                onClick={() => setActiveItem("cart")}
              />
          ) : null}

          {Auth.loggedIn() ? (
            <Menu.Menu position="right">
                <Menu.Item
                  as={Link}
                  to='/profile'
                  name={`${me.firstName} ${me.lastName}`}
                  active={window.location.pathname === '/profile'}
                  onClick={() => setActiveItem("profile")}
                />

              <Menu.Item name="logout" onClick={() => Auth.logout()} />
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
                <Menu.Item
                  as={Link}
                  to='/login'
                  name="login"
                  active={window.location.pathname === "/login"}
                  onClick={() => setActiveItem("login")}
                />

                <Menu.Item
                  as={Link}
                  to='/signup'                
                  name="signup"
                  active={window.location.pathname === "/signup"}
                  onClick={() => setActiveItem("signup")}
                />
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

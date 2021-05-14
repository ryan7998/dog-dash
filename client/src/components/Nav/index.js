import React, {useState} from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {Container, Menu} from 'semantic-ui-react'
// import Signup from "./pages/Signup";


function Nav() {
  const [activeItem, setActiveItem] = useState('home');

  function showNavigation() {
    if (Auth.loggedIn()) {
      // return (
      //   <ul className="flex-row">
      //     <li className="mx-1">
      //       <Link to="/orderHistory">
      //         Order History
      //       </Link>
      //     </li>
      //     <li className="mx-1">
      //       {/* this is not using the Link component to logout or user and then refresh the application to the start */}
      //       <a href="/" onClick={() => Auth.logout()}>
      //         Logout
      //       </a>
      //     </li>
      //   </ul>
      // );
    } else {
      return(
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
              Dog Dash
            </Menu.Item>
            <Link to="/">
              <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={()=>setActiveItem('home')}
                href='/'
                />
            </Link>

            <Menu.Item
                name='job-list'
                active={activeItem === 'job-list'}
                onClick={()=>setActiveItem('job-list')}
              />
            {Auth.loggedIn() ? 'LogOut' :
              <Menu.Menu position='right'>
                <Link to="/login">
                  <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={()=>setActiveItem('login')}
                  />
                </Link>

                <Link to="/signup">
                  <Menu.Item
                    name='signup'
                    active={activeItem === 'signup'}
                    onClick={()=>setActiveItem('signup')}
                  />
                </Link>
              </Menu.Menu>
            }
          </Container>
        </Menu>
      )
    }
  }

  return (
    <header>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;

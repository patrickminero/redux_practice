import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
Container,
} from 'reactstrap'
import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';


let AppNavBar = () =>{
  const [collapsed, setCollapsed] = useState(true);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3 text-info">
          <strong>
            {user && isAuthenticated ? `Welcome ${user.username}` : ''}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return(
    <div>
      <Navbar color="dark" expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/" className="text-info">React Practice</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              {user && isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavBar;
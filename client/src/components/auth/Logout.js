import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';


export const Logout = () => {
 const dispatch = useDispatch();
  return (
    <Fragment>
      <NavLink onClick={()=> dispatch(logout())} href="#" className="text-info">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
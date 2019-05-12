import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import {  Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/favicon.png'
import sygnet from '../../assets/img/brand/MyCloud_logo.png'

import { Button, } from 'reactstrap';
import firebase from '../../config/firebase';

const propTypes = {
  children: PropTypes.node,
};

const logOutUser = () => {
  firebase.auth().signOut();
 };

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
        full1={{ src: logo, width: 100, height: 65, alt: 'CoreUI Logo' }}
          full={{ src: sygnet, width: 100, height: 65, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
      
        <Nav className="d-md-down-none" navbar>

         
        {this.props.authenticated ? (
          <NavItem className="px-4">
            <NavLink block to="/logout" >
            <Button block color="primary" onClick={logOutUser} className="px-4">Logout</Button>
            </NavLink>
          </NavItem>
        ):(
          <NavItem className="px-4">
          <NavLink block to="/login" >
          <Button block color="primary" className="px-4">Login</Button>
          </NavLink>
        </NavItem>
       
        )}
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { Button, } from 'reactstrap';
import firebase from '../config/firebase';

const logOutUser = () => {
    firebase.auth().signOut();
};

class DefaultNavigation extends Component {
    render() {
        return (
            <div>
                <Nav className="d-md-down-none" navbar>

                   
                    <NavItem className="px-4">
                        <NavLink block to="/login" >
                            <Button block color="primary" className="px-4">Login</Button>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
export default DefaultNavigation;

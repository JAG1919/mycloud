import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { Button, } from 'reactstrap';
import firebase from '../config/firebase';

const logOutUser = () => {
    firebase.auth().signOut();
};

class UserNavigation extends Component {
    render() {
        return (
            <div>
                <Nav className="d-md-down-none" navbar>

                    <NavItem className="px-3">
                        <NavLink block to="/dashboard" >
                            <Button block color="primary" className="px-4">Dashboard</Button>
                        </NavLink>
                    </NavItem>

                    <NavItem className="px-3">
                        <NavLink block to="/logout" >
                            <Button block color="primary" onClick={logOutUser} className="px-4">Logout</Button>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
export default UserNavigation;

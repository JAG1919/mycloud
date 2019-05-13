import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UploadFiles from './UploadFiles';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { Button, } from 'reactstrap';
import DefaultHeader from '../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../containers/DefaultLayout/DefaultFooter';



class Dashboard extends Component {
    render() {
        return (
            <div>
               
               
                <UploadFiles/>
               
            </div>
        );
    }
}
export default Dashboard;

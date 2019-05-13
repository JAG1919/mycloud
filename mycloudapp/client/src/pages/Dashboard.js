import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UploadFiles from './UploadFiles';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { Button, } from 'reactstrap';
import DefaultHeader from '../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../containers/DefaultLayout/DefaultFooter';
import {
    AppFooter,
    AppHeader
   
  } from '@coreui/react';
  import firebase from '../config/firebase';  


class Dashboard extends Component {
    state = {
        authenticated: false,
      };
      componentDidMount(){
        firebase.auth().onAuthStateChanged((authenticated) => {
          authenticated
            ? this.setState(() => ({
                authenticated: true,
              }))
            : this.setState(() => ({
                authenticated: false,
              }));
        });
      }
    render() {
        return (
            <div className="app">
        <AppHeader>
            < DefaultHeader authenticated={this.state.authenticated}  />
            </AppHeader>
        <div className="app-body">
       <UploadFiles/>
        
        </div>
        <AppFooter>
            <DefaultFooter />
        </AppFooter>
      </div>
        );
    }
}
export default Dashboard;

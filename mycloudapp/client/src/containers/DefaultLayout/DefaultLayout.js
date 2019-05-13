import React, { Component, Suspense } from 'react';

import { Container } from 'reactstrap';

import {
 
  AppBreadcrumb,
  AppFooter,
  AppHeader
 
} from '@coreui/react';


// routes config
import routes from '../../routes';


import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import Home from '../../pages/Home';
import firebase from '../../config/firebase';
import Slider from '../../pages/Slider';

class DefaultLayout extends Component {
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
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  // signOut(e) {
  //   e.preventDefault()
  //   this.props.history.push('/login')
  // }

  render() {
    return (
      <div className="app">
        <AppHeader>
            < DefaultHeader authenticated={this.state.authenticated} />
            </AppHeader>
        <div className="app-body">
       
          {/* <main className="main">
          <div className="homecontent">
         <Home/>
         <Slider/>
         </div>
          </main> */}
         
        </div>
        <AppFooter>
            <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;

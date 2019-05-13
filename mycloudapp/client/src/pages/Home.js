import React, { Component } from 'react';
import Slider from './Slider';
import DefaultHeader from '../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../containers/DefaultLayout/DefaultFooter';
import firebase from '../config/firebase';
import {
  AppFooter,
  AppHeader
 
} from '@coreui/react';



class Home extends Component {
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
        <Slider/>
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
    // <div className="App">
    //  <AppHeader>
    //  <DefaultHeader/>
    //  </AppHeader>
    //  <div className="app-body">
    //  <Slider/>
    //  </div>
    /* <DefaultLayout/> */
    
    // <AppFooter>
    //         <DefaultFooter />
    //     </AppFooter>
      /* <h1>Project Home</h1>
      {/* Link to List.js */
      /* <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
      <UploadFiles /> */
    // </div>
    );
  }
}
export default Home;

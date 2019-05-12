import React, { Component } from 'react';
import { Route, Switch, NavLink,Router } from 'react-router-dom';
import DefaultLayout from '../containers/DefaultLayout/DefaultLayout';
import Home from './Home';
import Login from '../views/Pages/Login/Login';
import Register from '../views/Pages/Register/Register';
import Page404 from '../views/Pages/Page404/Page404';
import Page500 from '../views/Pages/Page500/Page500';
import List from './List';
import Logout from './Logout';

class Navigation extends Component {
  render() {
    const Navigation=()=>(
      <div>
      <Switch>
          <Route authenticated={this.props.authenticated} path='/list' component={List} />
          <Route authenticated={!this.props.authenticated} path="/login" path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/404" component={Page404} />
          <Route path="/500" component={Page500} />
          <Route path="/" component={DefaultLayout} />

        </Switch>
      </div>
    )
        return (
     
      <Switch>
             <Navigation/>
         </Switch>
      // <Router>
      //   <div>
      //     {/* <Row>
      //       <Column> */}
      //         <NavLink to="/Home">Home</NavLink>
      //         {this.props.authenticated ? (
      //           <span>
      //             <NavLink to="/List">List</NavLink>
      //             <Logout />
      //           </span>
      //         ) : (
      //             <span>
      //               <NavLink to="/Login">Login</NavLink>
      //               <NavLink to="/Register">Register</NavLink>
      //             </span>
      //           )}
      //       {/* </Column>
      //     </Row> */}
          
      //   </div>
      // </Router>
    );
  }
}
export default Navigation;
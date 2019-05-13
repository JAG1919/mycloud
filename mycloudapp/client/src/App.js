import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultLayout from './containers/DefaultLayout';
import Home from './pages/Home';
import Login from './views/Pages/Login';
import Register from './views/Pages/Register';
import Page404 from './views/Pages/Page404';
import Page500 from'./views/Pages/Page500';
import List from './pages/List';
// import firebase from '../src/config/firebase';
// import Navigation from './pages/Navigation'
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Dashboard from '../src/pages/Dashboard';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


class App extends Component {
  // state = {
  //   authenticated: false,
  // };
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((authenticated) => {
  //     authenticated
  //       ? this.setState(() => ({
  //           authenticated: true,
  //         }))
  //       : this.setState(() => ({
  //           authenticated: false,
  //         }));
  //   });
  // }

   render() {

  //   return <Navigation authenticated={this.state.authenticated} />;

    const App = () => (
      <div>
        <Switch>
        <Route path='/dashboard' component={Dashboard}/>
              <Route path='/list' component={List}/>
              <Route  path="/login" component = {Login} />
              <Route  path="/register" component = {Register}/>
              <Route  path="/404" component = {Page404}/>
              <Route  path="/500" component = {Page500}/>
              <Route path="/" component = {DefaultLayout}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultLayout from './containers/DefaultLayout';
import Home from './pages/Home';
import Login from './views/Pages/Login';
import Register from './views/Pages/Register';
import Page404 from './views/Pages/Page404';
import Page500 from'./views/Pages/Page500';
import List from './pages/List';

// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
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

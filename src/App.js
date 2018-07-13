import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/common/Header';
import HomePage from './Components/HomePage';
import Events from './Components/events/EventPage';
import Login from './Components/authentication/LoginPage';
import Register from './Components/authentication/RegisterPage';
import  from './Components/authentication/RegisterPage';

class App extends React.Component {
  render() {
      return (

          <BrowserRouter>
              <div>
                  <Route path="/" component = {Header}/>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/events" exact component={Events} />
                  {/* <Route path="/calendar" component={Calendar} /> */}
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/maps" exact component={Maps} />
              </div>
          </BrowserRouter>

      );
  }
}

export default App;

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/common/Header';
import HomePage from './Components/HomePage';
import Events from './Components/events/EventPage';
import Register from './Components/authentication/LoginPage';

class App extends React.Component {
  render() {
      return (

          <BrowserRouter>
              <div>
                  <Route path="/" component = {Header}/>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/events" exact component={Events} />
                  <Route path="/register" exact component={Register} />
              </div>
          </BrowserRouter>

      );
  }
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './Components/common/Header';
import HomePage from './Components/HomePage';
import Events from './Components/events/EventPage';
import Login from './Components/authentication/LoginPage';
import Register from './Components/authentication/RegisterPage';
import Maps from './Components/googleMaps/GoogleMapsPage';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    loginSuccess = (usernameVal) => {
        this.setState({ username: usernameVal });
    }

    clearUsername = () => {
        this.setState({ username: null });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <Header username={this.state.username} logout={this.clearUsername} />} />
                    <Route path="/" exact component={HomePage} username={this.state.username} />
                    <Route path="/events" exact component={Events} username={this.state.username} />
                    {/* <Route path="/calendar" component={Calendar} /> */}
                    <Route path="/login" exact render={() => <Login onLoginSuccess={this.loginSuccess} />} />
                    <Route path="/register" exact render={() => <Register onLoginSuccess={this.loginSuccess} />} />
                    <Route path="/maps" exact component={Maps} />
                    
                    <Route path="/logout" render={() => <Redirect to="/"/>} />
                </div>
            </BrowserRouter>

        );
    }
}

export default App;

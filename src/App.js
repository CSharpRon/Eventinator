import React from 'react';
import { BrowserRouter, withRouter, Route, Redirect } from 'react-router-dom';
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
            userid: null
        };
    }

    loginSuccess = (useridVal) => {
        this.setState({ userid: useridVal });
    }

    clearUserid = () => {
        this.setState({ userid: null });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <Header userid={this.state.userid} logout={this.clearUserid} />} />
                    <Route path="/" exact component={HomePage} userid={this.state.userid} />
                    <Route path="/events" exact render={() => <Events userid={this.state.userid}/>} />
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

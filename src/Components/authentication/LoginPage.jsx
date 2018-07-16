import React, { Component } from 'react';
import Style from './authentication.css';
import Clicks from './authentication.js';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import {endpoint} from '../../Api/URL_Const';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.sendLogin = this.sendLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    sendLogin() {
        var username = this.state.username;
        var password = this.state.password;
        var url = endpoint + '/login';

        var test = this;

        console.log(test.props);

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            data: JSON.stringify({ username, password }),
            url,
        };

        axios(options)
            .then(function (response) {
                
                if(response.data.userid) {
                    test.props.onLoginSuccess(response.data.userid);
                    test.props.history.push('/events');
                } else {
                    window.alert(response.data.res);
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <Link to="/login" className="active" id="login-form-link">Login</Link>
                                    </div>
                                    <div className="col-xs-6">
                                        <Link to="/register" id="register-form-link">Register</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12"><div className="form-group">
                                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange} name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
                                    </div>
                                        <div className="form-group">
                                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="form-group text-center">
                                            <input type="checkbox" tabIndex="3" className="" name="remember" id="remember" />
                                            <label htmlFor="remember"> Remember Me</label>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6 col-sm-offset-3">
                                                    <button name="login-submit" id="login-submit" onClick={this.sendLogin} tabIndex="4" className="form-control btn btn-login" style={{'height': '50px'}}>Log In</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="text-center">
                                                        <a href="https://localhost:3000/authentication/process" tabIndex="5" className="forgot-password">Forgot Password?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(LoginPage);
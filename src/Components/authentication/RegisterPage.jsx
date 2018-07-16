import React, { Component } from 'react';
import Style from './authentication.css';
import Clicks from './authentication.js';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../../Api/URL_Const';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',
        }

        this.sendRegister = this.sendRegister.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePassword1Change = this.handlePassword1Change.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword1Change(event) {
        this.setState({ password1: event.target.value });
    }

    handlePassword2Change(event) {
        this.setState({ password2: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    sendRegister() {

        var username = this.state.username;
        var password = this.state.password1;
        var url = endpoint + '/register';

        var test = this;

        console.log('username: ' + username);
        console.log('password: ' + password);

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({ username, password }),
            url,
        };

        axios(options)
            .then(function (response) {
                console.log(response);

                test.props.onLoginSuccess(response.data.userid);
                test.props.history.push('/events');
                <Redirect to="/" />

            })
            .catch(function (error) {
                console.log(error);
            });
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
                                        <Link to="/login" id="login-form-link">Login</Link>
                                    </div>
                                    <div className="col-xs-6">
                                        <Link to="/register" className="active" id="register-form-link">Register</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div id="register-form" style={{ "display": "block" }}>
                                            <div className="form-group">
                                                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" value={this.state.email} onChange={this.handleEmailChange} name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={this.state.password1} onChange={this.handlePassword1Change} name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={this.state.password2} onChange={this.handlePassword2Change} name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" />
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <button name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" onClick={this.sendRegister} style={{ 'height': '50px' }}>Register Now</button>
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
            </div>
        );
    }
}

export default withRouter(Register);
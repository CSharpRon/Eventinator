import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AuthenticationApi from '../../Api/Authentication/authenticationApi';
import axios from 'axios';

class Register extends Component {

    sendRegister() {

        var username = 'ron';
        var password = 'jon';

        axios.post(URL, {
            username: this.username,
            password: this.password
        })
        // AuthenticationApi.register(username, password)
        //     .then((result) => {
        //         alert('success! ' + result);
        //     })
        //     .catch((err) => {
        //         console.log(JSON.stringify(err));
        //         alert('Error registering user: ');
        //     });
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
                                        <form id="register-form" role="form" style={{"display": "block"}}>
                                            <div className="form-group">
                                                <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" />
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <button type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" onClick={this.sendRegister} value="Register Now" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default Register;
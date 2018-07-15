import React, { Component } from 'react';
import Logo from '../../Images/Hooli.png';
import { Link } from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand" style={{ paddingTop: 0 }}>
                            <img alt="brand" src={Logo} style={{ height: 'inherit' }} />
                        </Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                    </ul>
                    {!this.state.username ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    ) : (
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/account">My Account</Link></li>
                            </ul>
                        )}
                </div>
            </nav>
        );
    }
}

export default Header;
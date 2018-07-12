import React, { Component } from 'react';
import Logo from '../../Images/Hooli.png';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
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
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/register">Login/Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
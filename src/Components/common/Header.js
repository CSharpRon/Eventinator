import React, { Component } from 'react';
import Logo from '../../Images/Hooli.png';
import { Link } from 'react-router-dom';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: props.userid,
        }
    }

    static defaultProps = {
        userid: null
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
                        {this.props.userid ? (
                            <li><Link to="/events">Events</Link></li>
                        ) : <div/>}
                    </ul>
                    {!this.props.userid ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    ) : (
                            <div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/logout" onClick={this.props.logout} >Logout</Link></li>
                                </ul>
                            </div>
                        )}
                </div>
            </nav>
        );
    }
}

export default Header;
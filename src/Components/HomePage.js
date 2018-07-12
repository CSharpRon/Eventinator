import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
    render() {
        return ( 

            <div className="App">
                <header className="App-header" style={{ height: "40%" }}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Eventinator - Your one stop shop to making calendar events<br />
                        From Camilo, Josue, and Ron
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
          </h1>
                </header>
            </div>
        );
    }
}

export default Home;
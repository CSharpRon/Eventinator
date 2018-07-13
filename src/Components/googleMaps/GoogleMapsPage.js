import React, { Component } from 'react';
import { render } from 'react-dom';
import Markers from './Markers'; 
//import './style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Markers  />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

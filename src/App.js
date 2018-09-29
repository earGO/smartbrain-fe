import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/* 
        <ImagereLinkForm />
        <Facerecognition /> */}
      </div>
    );
  }
}

export default App;

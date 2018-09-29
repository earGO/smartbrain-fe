import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js';
import './App.css';

const paticlesOptions = {
                          particles: {
                            number: {
                              value: 123,
                              density: {
                                enable: true,
                                value_area: 520
                              }
                            },
                          }
                        }


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={paticlesOptions}

            />
        
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* 
        
        <Facerecognition /> */}
      </div>
    );
  }
}

export default App;

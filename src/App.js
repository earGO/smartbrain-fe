import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'
import Facerecognition from './Components/Facerecognition/Facerecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
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


const app = new Clarifai.App({
  apiKey: 'bb1e19e2309c44b5ba9df3393686333d'
 });

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
      console.log(err);
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={paticlesOptions} 

            />
        
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <Facerecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

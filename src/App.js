import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'
import Facerecognition from './Components/Facerecognition/Facerecognition';
import Signin from './Components/Signin/Signin';
import Registration from './Components/Registration/Registration';
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
  apiKey: '0ae7cd6cb290496a96bafa0c291479b0'
 });

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  displayFaceBox =(boxcoord) => {
    console.log(boxcoord);
    this.setState({box: boxcoord});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={paticlesOptions} 

            />
        
        <Navigation />
        <Signin />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <Facerecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

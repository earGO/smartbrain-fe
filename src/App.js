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

//the variable to set a background particles parameters
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

//the variable to initiate a clarifai-api in an app
const app = new Clarifai.App({
  apiKey: '0ae7cd6cb290496a96bafa0c291479b0' //here we should place an API key from clarifai
 });

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '', //a state for an image ling form input
      imageUrl: '', //a state for an image url for a recognition
      box: {}, //a state for a recognized face bounding box
      route: 'signin',//a state for keeping track of where user on a page is
      isSignedIn: false,//a state for a navigation menu control, 'false' by default meaning user is not signed in
      user: {  //an object for a user to send to a backend and get from backend
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
//a function to load user data from database
  loadUser = (userdata) => {
    this.setState({user: {
      id: userdata.id,
      name: userdata.name,
      email: userdata.email,
      entries: userdata.entries,
      joined: userdata.joined
    }})
  }


//a method for a recognized face location
  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; //a bounding box coordinates from a clarifai API response
    const image = document.getElementById('inputImage');//an image for a width and height
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
//the absolute coordinates of a recognized face bounding box, the (0;0) point is at the left top corner of an image
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }
//a method for displaying recognized face bounding box; it takes a coordinates from calculateFaceLocation method as an input and gives it to a box state
  displayFaceBox =(boxcoord) => {
    console.log(boxcoord);
    this.setState({box: boxcoord});
  }
//a method for a state changing from an image link form input
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
//a method for a Detect button
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); //takes input state as an url for an image
    app.models.predict(Clarifai.FACE_DETECT_MODEL, //sets face recognition model
    this.state.input)//takes actual image from the web
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))//creates a bounding box to send it as a prop to Facerecognition component
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route==='signout') {//if user clicks 'Sign out' on Navigation component we change 'isSignedIn' state so "Sign in" and "registration" displayed on a Navigation component
      this.setState({isSignedIn:false})
    } else if (route==='home'){//if user is signed in we change 'isSignedIn' state so "Sign out" displayed on a Navigation component
      this.setState({isSignedIn: true})
    }
    this.setState({'route': route});
  }

//main render method for a components
  render() {
    return (
      <div className="App">
        <Particles className='particles' //creates a background particles, using the particlesOptions variable as parameters
              params={paticlesOptions} 

            />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/*here we selecting what to show based on a 'route' state*/}
        { this.state.route ==='home' //show main app screen if a 'route' state is 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} //this prop manages the image URL input in a form
                onButtonSubmit={this.onButtonSubmit}//this prop manages clicking on a Detect-button
              />
              <Facerecognition 
                box={this.state.box} //this prop manages the bounding box for a recognized face on an image
                imageUrl={this.state.imageUrl}//this prop manages image URL for a rendering purposes - it actualy lods images in a component and shows it on a web-page
              />
            </div>
            : (
              this.state.route==='signin'
              ?<Signin onRouteChange={this.onRouteChange}/> //showign signin screen if 'route' is signin (by a default)
              : (this.state.route==='register'
                ?<Registration onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> //showign signin screen if 'route' is signin (by a default)
                :<Signin onRouteChange={this.onRouteChange}/>
                ) //showign signin screen if 'route' is signin (by a default)/
            )
              
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Particles from 'react-particles-js';

import FaceRecognition from './Components/Facerecognition/Facerecognition';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Registration/Registration';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

//You must add your own API key here from Clarifai.


const particlesOptions = {
    particles: {
        number: {
            value: 130,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }})
    }
/*a method for a recognized face location*/
    calculateFaceLocation =(data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; /*a bounding box coordinates from a clarifai API response*/
        const image = document.getElementById('inputImage');/*an image for a width and height*/
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(clarifaiFace);
/*the absolute coordinates of a recognized face bounding box, the (0;0) point is at the left top corner of an image*/
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - clarifaiFace.bottom_row * height,
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('https://sleepy-beach-37692.herokuapp.com/imageurl', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      input: this.state.input
                  })
              })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://sleepy-beach-37692.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count}))
                        })

                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home'
                    ? <div>
                        <Logo />
                        <Rank
                            rankedname={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;

/*app state as pushed on heroku*/
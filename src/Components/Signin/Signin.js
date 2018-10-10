import React from 'react';

//now we have a smart component with it's own state
class Signin extends React.Component {
    //giving props from the parent App component to Signin component
    constructor(props) {
        //giving props here as well
        super(props);
        this.state={
            signInEmail: '',
            signInPassword: ''
        }
    }
    /*state change for an user e-mail*/
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    /*state change for an user password*/
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignin = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 shadow-2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <div id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="sign-email-address" 
                                        onChange={this.onEmailChange}
                                        />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="sign-password" 
                                        onChange={this.onPasswordChange}
                                        />
                                </div>
                       </div>
                        <div className="">
                            <input /*here we used to change 'route' state to display main app screen.
                                    //but now we will call an onSubmitSignin method of a component and change 'route' state there*/
                                    onClick={this.onSubmitSignin}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" value="Sign in" 
    
                                    />
                        </div>
                        <div className="lh-copy mt3 pointer f3">
                            <p /*here we send User to a registration screen*/
                                onClick = {() => onRouteChange('register')}
                                href="#0" className="f6 link dim black db"
                                >Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;
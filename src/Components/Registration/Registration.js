import React from 'react';


class Registration extends React.Component  {
    constructor(props) {
        //giving props here as well
        super(props);
        this.state={
            email: '',
            password: '',
            name: '',
        }
    }

        //state change for an user name
        onNameChange = (event) => {
            this.setState({name: event.target.value})
        }
        //state change for an user e-mail
        onEmailChange = (event) => {
            this.setState({email: event.target.value})
        }
        //state change for an user password
        onPasswordChange = (event) => {
            this.setState({password: event.target.value})
        }
    //the method for sending user data to server
        onRegister = () => {
            fetch('http://localhost:3000/register',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                })
            })
                .then(response => response.json())
                .then (user => { //we wanna get user response from server
                    //here we make the master App 'route' change only
                    //if the user autorization is successful, and we get a 'success' message from a server
                    if (user){
                        this.props.loadUser(user);
                        //this is where we change parent 'route' state to 'home' now instead of line 46
                        this.props.onRouteChange('home');
                    }
                });
    
        }
    render() {
    const {onRouteChange, loadUser} = this.props;
    return (
        <article className="br3 shadow-2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <div id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="reg-name" 
                                    onChange={this.onNameChange}
                                    />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="reg-email-address" 
                                    onChange={this.onEmailChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="reg-password" 
                                    onChange={this.onPasswordChange}
                                    />
                            </div>
                   </div>
                    <div className="">
                    <input //here we used to change 'route' state to display main app screen.
                                    //but now we will call an onRegister method of a component and change 'route' state there                                
                                onClick={this.onRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" value="Register" 

                                />
                    </div>
                </div>
            </main>
        </article>
    );
}
}

export default Registration;
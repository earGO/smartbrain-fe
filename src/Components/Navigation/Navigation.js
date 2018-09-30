import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {//display "Sign out" option if user is on main app screen. This means that isSignedIn=true, and 'route' state is 'home'
        return (
            <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                        onClick={() => onRouteChange('signout')}
                        className='f3 link dim black underline pa3 pointer'
                    >Sign out</p>
            </nav>
        );
    } else {//display "Sign in" and "Register" options if user is not Sighed in. This means that isSignedIn=false, and 'route' state is 'signout'
        return (
            <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                        onClick={() => onRouteChange('signin')}
                        className='f3 link dim black underline pa3 pointer'
                    >Sign in</p>
                <p 
                        onClick={() => onRouteChange('register')}
                        className='f3 link dim black underline pa3 pointer'
                    >Register</p>
            </nav>
        );
    }
    
}

export default Navigation;
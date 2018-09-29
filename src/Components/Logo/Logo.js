import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
 
<Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
 <div className="Tilt-inner"> <p>logo ph</p> </div>
</Tilt>

const Logo = () => {
    return (
       <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 👽 </div>
            </Tilt>
       </div> 
    );
}

export default Logo;
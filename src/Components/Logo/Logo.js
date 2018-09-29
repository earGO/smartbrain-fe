import React from 'react';
import Tilt from 'react-tilt';
import Brain from './icons8-brain-50.png'
import './Logo.css';

const Logo = () => {
    return (
       <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> <img alt='Brain icon' style={{paddingTop: '5px'}} src={Brain} width='120'/> </div>
            </Tilt>
       </div> 
    );
}

export default Logo;
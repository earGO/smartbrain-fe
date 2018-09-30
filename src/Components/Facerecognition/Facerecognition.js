import React from 'react';
import './Facerecognition.css';

//here we are recieving props from a top APP level
const Facerecognition = ({imageUrl, box}) => {  
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
            {/*here we R loading image from the URL and showing it on a web-page*/}
                <img id='inputImage' alt='' src={imageUrl} width='700px' height='auto'/> 
                {/*here we R drawing a bounding box from an image detection*/}
                <div className='bounding-box'       
                    style={{
                            top: box.topRow,
                            right: box.rightCol,
                            left: box.leftCol,                            
                            bottom: box.bottomRow,
                    }}></div>
            </div>
        </div>
    );
}

export default Facerecognition;
import React from 'react';

const Facerecognition = ({imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' src={imageUrl} width='700px' height='auto'/>
            </div>
        </div>
    );
}

export default Facerecognition;
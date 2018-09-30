import React from 'react';
import './ImageLinkForm.1.css'; 

//here we R recieving props from a main APP state
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'Ths magic brain will detrect faces in your pictures! Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                {/*this is the part, that changes the 'onInputChange' prop, that sets the 'input' state*/}
                    <input className='f4 pa2 w-70 center'  type='text' onChange={onInputChange}/>
                {/*this is a Detect-button that changes 'onButtonSubmit' prop that sets 'imageUrl' state */}
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
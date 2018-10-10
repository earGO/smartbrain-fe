import React from 'react';

const Rank = ({rankedname, entries}) => {
    return (
        <div>
            <div className='white f3'>
                {`${rankedname}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
 
    );
}

export default Rank;
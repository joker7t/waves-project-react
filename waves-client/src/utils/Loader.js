import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
        <div className='main_loader'>
            <CircularProgress style={{ color: '#989591' }} thickness={7} size={100} />
        </div>
    );
}

export default Loader;

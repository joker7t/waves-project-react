import React from 'react';

const Header = () => {
    return (
        <header className='bck_b_light'>
            <div className='container' style={{ height: '100%' }}>
                <div className='left'>
                    <div className='logo'>
                        Waves
                    </div>
                </div>
                <div className='right'>
                    <div className='top'>
                        top
                    </div>
                    <div className='bottom'>
                        bottom
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

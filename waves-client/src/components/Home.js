import React from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';

const Home = () => {
    return (
        <div className='page_container'>
            <HomeSlider />
            <HomePromotion />
        </div>
    );
}

export default Home;

import React from 'react';
import Feature1 from '../images/featured/featured_home.jpg';
import Feature2 from '../images/featured/featured_home_2.jpg';
import Slider from 'react-slick';
import Button from '../utils/Button';

const HomeSlider = () => {

    const slides = [
        {
            img: Feature1,
            lineOne: 'Fender',
            lineTwo: 'Custom shop',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: Feature2,
            lineOne: 'B-Stock',
            lineTwo: 'Awesome discounts',
            linkTitle: 'View offers',
            linkTo: '/shop'
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const generateSlides = () => (
        slides ?
            slides.map((slide, i) =>
                <div key={i}>
                    <div
                        className='featured_image'
                        style={{
                            background: `url(${slide.img})`,
                            height: `100vh`,
                            width: `100%`
                        }}
                    >
                        <div className='featured_action'>
                            <div className='tag title'>{slide.lineOne}</div>
                            <div className='tag low_title'>{slide.lineTwo}</div>
                            <div>
                                <Button
                                    type='default'
                                    title={slide.linkTitle}
                                    linkTo={slide.linkTo}
                                    addStyles={{
                                        margin: '10px 0 0 0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
            : null
    )

    return (
        <div className='featured_container'>
            <Slider {...settings}>
                {generateSlides()}
            </Slider>
        </div>
    );
}

export default HomeSlider;

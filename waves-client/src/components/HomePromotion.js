import React from 'react';
import Feature3 from '../images/featured/featured_home_3.jpg';
import Slider from 'react-slick';
import Button from '../utils/Button';

const HomePromotion = () => {

    const promotion = {
        img: Feature3,
        lineOne: 'Up to 40% off',
        lineTwo: 'In second hand guitars',
        linkTitle: 'Shop now',
        linkTo: '/shop'
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const renderPromotions = () => (
        <div>
            <div
                className='home_promotion_img'
                style={{
                    background: `url(${promotion.img})`,
                    width: `100%`
                }}
            >
                <div className='featured_action'>
                    <div className='tag title'>{promotion.lineOne}</div>
                    <div className='tag low_title'>{promotion.lineTwo}</div>
                    <div>
                        <Button
                            type='default'
                            title={promotion.linkTitle}
                            linkTo={promotion.linkTo}
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className='home_promotion'>
            <Slider {...settings}>
                {renderPromotions()}
            </Slider>
        </div>
    );
}

export default HomePromotion;

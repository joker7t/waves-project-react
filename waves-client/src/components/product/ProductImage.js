import React, { useState } from 'react';
import ImageNotAvailable from '../../images/image_not_availble.png';
import MyLightbox from './MyLightbox';

const ProductImage = ({ images }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isOpenLightbox, setIsOpenLightbox] = useState(false);

    const renderImage = () => {
        if (images.length >= 0) {
            return images[0].url;
        } else {
            return ImageNotAvailable;
        }
    }

    const handleLightboxImage = (index = 0) => {
        setImageIndex(index);
        setIsOpenLightbox(true);
    }

    const handleCloseLightbox = () => {
        setIsOpenLightbox(false);
    }

    const changeImage = (newIndex) => {
        setImageIndex(newIndex);
    }

    const showThums = () =>
        images.map((image, i) =>
            i > 0 &&
            <div
                key={i}
                onClick={() => handleLightboxImage(i)}
                className='thumb'
                style={{
                    background: `url(${image.url}) no-repeat`
                }}
            >

            </div>
        )

    return (
        <div className='product_image_container'>
            <div className='main_pic'>
                <div
                    onClick={() => handleLightboxImage()}
                    style={{
                        background: `url(${renderImage()}) no-repeat`
                    }}
                >
                </div>
            </div>
            <div className='main_thumbs clear'>
                {showThums()}
            </div>
            {
                isOpenLightbox ?
                    <MyLightbox
                        closeLightbox={handleCloseLightbox}
                        imageIndex={imageIndex}
                        isOpenLightbox={isOpenLightbox}
                        images={images}
                        changeImage={changeImage}
                    />
                    :
                    null
            }
        </div>
    );
}

export default ProductImage;

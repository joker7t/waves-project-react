import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const MyLightbox = ({ closeLightbox, imageIndex, isOpenLightbox, images, changeImage }) => {
    return (
        <div>
            {isOpenLightbox && (
                <Lightbox
                    mainSrc={images[imageIndex].url}
                    nextSrc={images[(imageIndex + 1) % images.length].url}
                    prevSrc={images[(imageIndex + images.length - 1) % images.length].url}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                        changeImage((imageIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        changeImage((imageIndex + 1) % images.length)
                    }
                />
            )}
        </div>
    );
}

export default MyLightbox;

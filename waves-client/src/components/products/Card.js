import React from 'react';
import DefaultImage from '../../images/image_not_availble.png';

const Card = ({ card, grid }) => {

    const renderCardImage = () => {
        const { images } = card;
        return images.length > 0 ? images[0].url : DefaultImage;
    }

    return (
        <div className={`card_item_wrapper ${grid}`}>
            <div className='image'
                style={{
                    background: `url(${renderCardImage()}) no-repeat`
                }}
            >
            </div>
            <div className='action_container'>
                <div className='tags'>
                    <div className='brand'>{card.brand.name}</div>
                    <div className='name'>{card.name}</div>
                    <div className='price'>{card.price}</div>
                </div>
                {grid &&
                    <div className='description'>
                        {card.description}
                    </div>
                }
            </div>

        </div>
    );
}

export default Card;

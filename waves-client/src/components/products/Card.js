import React from 'react';
import DefaultImage from '../../images/image_not_availble.png';
import Button from '../../utils/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Card = ({ card, grid }) => {

    const renderCardImage = () => {
        const { images } = card;
        return images.length > 0 ? images[0].url : DefaultImage;
    }

    const addToCartHandler = () => {
        console.log('add to cart');
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
                    <div className='price'>$ {card.price}</div>
                </div>
                {grid &&
                    <div className='description'>
                        {card.description}
                    </div>
                }
                <div className='actions'>
                    <div className='button_wrapp'>
                        <Button
                            type='default'
                            altClass='card_link'
                            title='View product'
                            linkTo={`/product_detail/${card._id}`}
                        />
                    </div>

                    <div className='button_wrapp'>
                        <div
                            className='bag_link'
                            onClick={addToCartHandler}
                        >
                            <FontAwesomeIcon
                                icon={faShoppingBag}
                                className='icon'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

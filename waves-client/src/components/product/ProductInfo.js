import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const ProductInfo = ({ product, addToCart }) => {

    const { _id, name, brand, description, shipping, available, price, frets, wood } = product;
    return (
        <div>
            <h1>{brand.name} {name}</h1>
            <p>{description}</p>
            <div className='product_tags'>
                {shipping ?
                    <div className='tag'>
                        <div><FontAwesomeIcon icon={faTruck} /></div>
                        <div className='tag_text'>
                            <div>Free shipping</div>
                            <div>And return</div>
                        </div>
                    </div>
                    :
                    null
                }
                {available ?
                    <div className='tag'>
                        <div><FontAwesomeIcon icon={faCheck} /></div>
                        <div className='tag_text'>
                            <div>Available</div>
                            <div>In store</div>
                        </div>
                    </div>
                    :
                    <div className='tag'>
                        <div><FontAwesomeIcon icon={faTimes} /></div>
                        <div className='tag_text'>
                            <div>Not available</div>
                            <div>Pre-oder only</div>
                        </div>
                    </div>
                }
            </div>
            <div className='product_actions'>
                <div className='price'>$ {price}</div>
                <div className='cart'>
                    <div
                        className='add_to_cart_link'
                        onClick={() => addToCart(_id)}
                    >
                        <FontAwesomeIcon icon={faShoppingBag} />Add to cart
                    </div>
                </div>
            </div>
            <div className='product_specifications'>
                <h2>Specifications: </h2>
                <div>
                    <div className='item'>
                        <strong>Frets: </strong>{frets}
                    </div>
                    <div className='item'>
                        <strong>Wood: </strong>{wood.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;

import React from 'react';
import ImageNotAvailable from '../../../images/image_not_availble.png';

export default function UserProductBlock({ products, type, removeItem }) {

    const renderImage = (product) => {
        return product.images.length > 0 ? product.images[0].url : ImageNotAvailable;
    }

    const renderCarts = () =>
        products.map((product, i) =>
            <div className='user_product_block' key={i}>
                <div className='item'>
                    <div
                        className='image'
                        style={{ background: `url(${renderImage(product)}) no-repeat` }}
                    />
                </div>
                <div className='item'>
                    <h4>Product name</h4>
                    <div className='text'>{product.brand.name} {product.name}</div>
                </div>
                <div className='item'>
                    <h4>Quantity</h4>
                    <div className='text'>{product.quantity}</div>
                </div>
                <div className='item'>
                    <h4>Price</h4>
                    <div className='text'>${product.price}</div>
                </div>
                <div className='item btn'>
                    <div className='cart_remove_btn' onClick={() => removeItem(product._id)}>
                        Remove
                    </div>
                </div>
            </div>
        )

    return (
        <div>
            {renderCarts()}
        </div>
    )
}

import React from 'react';
import CardBlockShop from './CardBlockShop';

const LoadmoreCards = ({ grid, limit, products, loadMore }) => {
    return (
        <div>
            <div>
                <CardBlockShop
                    grid={grid}
                    list={products}
                />
            </div>
        </div>
    );
}

export default LoadmoreCards;

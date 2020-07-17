import React from 'react';
import CardBlockShop from './CardBlockShop';

const LoadmoreCards = ({ grid, limit, size, products, loadMore }) => {
    return (
        <div>
            <div>
                <CardBlockShop
                    grid={grid}
                    list={products}
                />
            </div>

            {
                size < limit ? null :
                    <div className='load_more_container'>
                        <span onClick={loadMore}>
                            Load more
                        </span>
                    </div>
            }

        </div>
    );
}

export default LoadmoreCards;

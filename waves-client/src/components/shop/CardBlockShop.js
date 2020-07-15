import React from 'react';
import Card from '../products/Card';

const CardBlockShop = ({ grid, list }) => {

    const renderCards = () => list && list.map((item, i) =>
        <Card
            card={item}
            grid={grid}
        />
    )



    console.log(list)

    return (
        <div className='card_block_shop'>
            <div>
                <div>
                    {list ?
                        list.length === 0 ?
                            <div className='no_result'>
                                Sorry, no results
                            </div>
                            : renderCards()
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default CardBlockShop;

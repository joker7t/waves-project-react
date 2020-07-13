import React from 'react';
import Card from './Card';

const CardBlock = ({ title, list }) => {

    const renderCards = () =>
        list ? list.map((card, i) => (
            <Card
                key={i}
                card={card}
                grid='grid_bars'
            />
        )) : null


    return (
        <div className='card_block'>
            <div className='container'>
                {title ?
                    (
                        <div className='title'>
                            {title}
                        </div>
                    ) :
                    null
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {renderCards()}
                </div>
            </div>
        </div>
    );
}

export default CardBlock;

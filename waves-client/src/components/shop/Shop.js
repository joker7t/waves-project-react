import React, { useEffect, useState } from 'react';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import { getBrands, getWoods, getShop } from '../../actions/productAction';
import axios from 'axios';
import CollapseCheckbox from '../../utils/CollapseCheckbox';
import { frets, price } from '../../utils/Category';
import CollapseRadio from '../../utils/CollapseRadio';

const Shop = ({ getBrands, getWoods, getShop, product }) => {

    const [shopData, setShopData] = useState({
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const brandRes = await axios.get('/api/products/brands');
                getBrands(brandRes.data.branddata);
                const woodRes = await axios.get('/api/products/woods');
                getWoods(woodRes.data.wooddata);
                const shopProductRes = await axios.post('/api/products/shop', {
                    limit: shopData.limit,
                    skip: shopData.skip,
                    filters: shopData.filters
                });
                getShop(shopProductRes.data.productdata);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();

        //eslint-disable-next-line
    }, []);

    const handlePrice = (priceId) => price.filter(priceItem => priceItem._id === parseInt(priceId))[0].array

    const handleFilters = async (filters, category) => {
        const newFilters = { ...shopData.filters };
        newFilters[category] = filters;
        if (category === 'price') {
            newFilters[category] = handlePrice(filters);
        }
        setShopData({ ...shopData, filters: newFilters });
        const shopProductRes = await axios.post('/api/products/shop', {
            limit: shopData.limit,
            skip: 0,
            filters: newFilters
        });
        console.log({
            limit: shopData.limit,
            skip: 0,
            filters: newFilters
        })
        getShop(shopProductRes.data.productdata);
    }

    return (
        <div>
            <PageTop title='Browse Products' />
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        <CollapseCheckbox
                            initialState={true}
                            title='Brands'
                            list={product.brands}
                            handleFilters={(filters) => handleFilters(filters, 'brand')}
                        />
                        <CollapseCheckbox
                            initialState={false}
                            title='Frets'
                            list={frets}
                            handleFilters={(filters) => handleFilters(filters, 'fret')}
                        />
                        <CollapseCheckbox
                            initialState={false}
                            title='Woods'
                            list={product.woods}
                            handleFilters={(filters) => handleFilters(filters, 'wood')}
                        />
                        <CollapseRadio
                            initialState={true}
                            title='Woods'
                            list={price}
                            handleFilters={(filters) => handleFilters(filters, 'price')}
                        />
                    </div>
                    <div className='right'>
                        right
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getBrands, getWoods, getShop })(Shop);
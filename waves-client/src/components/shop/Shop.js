import React, { useEffect, useState } from 'react';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import { getBrands, getWoods, getShop } from '../../actions/productAction';
import axios from 'axios';
import CollapseCheckbox from '../../utils/CollapseCheckbox';
import { frets, price } from '../../utils/Category';
import CollapseRadio from '../../utils/CollapseRadio';
import LoadmoreCards from './LoadmoreCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
import Loader from '../../utils/Loader';

const Shop = ({ getBrands, getWoods, getShop, product }) => {

    const [shopData, setShopData] = useState({
        grid: '',
        size: 0,
        limit: 4,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
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
                setShopData({ ...shopData, size: shopProductRes.data.productdata.length });
                getShop(shopProductRes.data.productdata);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
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
        getShop(shopProductRes.data.productdata);
        setShopData({ ...shopData, size: shopProductRes.data.productdata.length });
    }

    const loadMoreCards = async () => {
        try {
            const skip = shopData.skip + shopData.limit;
            setShopData({ ...shopData, skip: skip });
            const shopProductRes = await axios.post('/api/products/shop', {
                limit: shopData.limit,
                skip: skip,
                filters: shopData.filters
            });
            getShop([...product.products, ...shopProductRes.data.productdata]);
            setShopData({ ...shopData, size: shopProductRes.data.productdata.length });
        } catch (error) {
            console.log(error);
        }
    }

    const handleGrid = () => {
        setShopData({
            ...shopData,
            grid: shopData.grid ? '' : 'grid_bars'
        });
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
                        {isLoading ?
                            <Loader />
                            :
                            <div>
                                <div className='shop_options'>
                                    <div className='grid_bars clear'>
                                        <div
                                            className={`grid_btn ${shopData.grid ? '' : 'active'}`}
                                            onClick={handleGrid}
                                        >
                                            <FontAwesomeIcon icon={faTh} />
                                        </div>
                                        <div
                                            className={`grid_btn ${!shopData.grid ? '' : 'active'}`}
                                            onClick={handleGrid}
                                        >
                                            <FontAwesomeIcon icon={faBars} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <LoadmoreCards
                                        grid={shopData.grid}
                                        size={shopData.size}
                                        limit={shopData.limit}
                                        products={product.products}
                                        loadMore={loadMoreCards}
                                    />
                                </div>
                            </div>
                        }

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
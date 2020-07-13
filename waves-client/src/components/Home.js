import React, { useEffect } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import { connect } from 'react-redux';
import { getProductByArrival, getProductBySell } from '../actions/productAction';
import axios from 'axios';
import PropTypes from 'prop-types';
import CardBlock from './products/CardBlock';

const Home = ({ getProductByArrival, getProductBySell, product }) => {

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const resBySell = await axios.get('/api/products/articles?sortBy=sold&order=desc&limit=4');
                getProductBySell(resBySell.data.productdata);
                const resByArrival = await axios.get('/api/products/articles?sortBy=createdAt&order=desc&limit=4');
                getProductByArrival(resByArrival.data.productdata);
            } catch (error) {
                console.log(error);
            }
        }

        loadProducts();

        //eslint-disable-next-line
    }, []);

    return (
        <div className='page_container'>
            <HomeSlider />
            <CardBlock list={product.bySell} title='Best selling guitars' />
            <CardBlock list={product.byArrival} title='New arrivals' />
            <HomePromotion />
        </div>
    );
}

Home.propTypes = {
    getProductByArrival: PropTypes.func.isRequired,
    getProductBySell: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getProductByArrival, getProductBySell })(Home);

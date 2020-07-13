import React, { useEffect } from 'react';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import { getBrands, getWoods } from '../../actions/productAction';
import axios from 'axios';

const Shop = ({ getBrands, getWoods }) => {

    useEffect(() => {
        const loadData = async () => {
            try {
                const brandRes = await axios.get('/api/products/brands');
                getBrands(brandRes.data.branddata);
                const woodRes = await axios.get('/api/products/woods');
                getWoods(woodRes.data.wooddata);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();

        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <PageTop title='Browse Products' />
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>

                    </div>
                    <div className='right'>

                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getBrands, getWoods })(Shop);
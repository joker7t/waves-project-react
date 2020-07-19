import React, { useEffect } from 'react';
import UserLayout from './UserLayout';
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';
import { connect } from 'react-redux';
import { getBrands, getWoods } from '../../../actions/productAction';
import axios from 'axios';

const ManageCategories = ({ getBrands, getWoods, product }) => {

    useEffect(() => {
        const loadData = async () => {
            const { brands, woods } = product;
            try {
                if (brands.length === 0) {
                    const brandRes = await axios.get('/api/products/brands');
                    getBrands(brandRes.data.branddata);
                }
                if (woods.length === 0) {
                    const woodRes = await axios.get('/api/products/woods');
                    getWoods(woodRes.data.wooddata);
                }
            } catch (error) {
                console.log(error);
            }
        };

        loadData();

        //eslint-disable-next-line
    }, []);

    return (
        <UserLayout>
            <ManageBrands brands={product.brands} />
            <div className='form_devider' />
            <ManageWoods woods={product.woods} />
        </UserLayout>
    );
}

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getBrands, getWoods })(ManageCategories);
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../actions/productAction';
import PageTop from '../../utils/PageTop';
import Loader from '../../utils/Loader';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

const Product = ({ history, match, setSelectedProduct, selectedProduct }) => {

    useEffect(() => {
        const loadData = async () => {
            try {
                const { id } = match.params;
                const res = await axios.get(`/api/products/article?type=single&id=${id}`);
                setSelectedProduct(res.data.productdata);
            } catch (error) {
                history.push('/');
            }
        }

        loadData();

        return () => {
            setSelectedProduct(null);
        };
        //eslint-disable-next-line
    }, []);

    const addToCartHandler = () => {
        console.log('add to cart');
    }

    return (
        <div className='page_container'>
            <PageTop title='Product detail' />
            <div className='container'>
                {
                    selectedProduct ?
                        <div className='product_detail_wrapper'>
                            <div className='left'>
                                <ProductImage
                                    images={selectedProduct.images}
                                />
                            </div>
                            <div className='right'>
                                <ProductInfo
                                    addToCart={addToCartHandler}
                                    product={selectedProduct}
                                />
                            </div>
                        </div>
                        :
                        <Loader />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedProduct: state.product.selectedProduct
});

export default connect(mapStateToProps, { setSelectedProduct })(Product);

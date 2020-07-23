import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../actions/productAction';
import { addToCart } from '../../actions/userAction';
import PageTop from '../../utils/PageTop';
import Loader from '../../utils/Loader';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

const Product = ({ history, match, setSelectedProduct, selectedProduct, addToCart, user }) => {

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

    const addToCartHandler = async (id) => {
        try {
            const res = await axios.post(`/api/users/add-to-cart?id=${user.id}&productId=${id}`);
            addToCart(res.data);
        } catch (error) {
            console.log(error);
        }
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
    selectedProduct: state.product.selectedProduct,
    user: state.auth.user
});

export default connect(mapStateToProps, { setSelectedProduct, addToCart })(Product);

import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../actions/productAction';

const Product = ({ history, match, setSelectedProduct }) => {

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

        //eslint-disable-next-line
    }, []);

    return (
        <div className='page_container'>

        </div>
    );
}

export default connect(null, { setSelectedProduct })(Product);

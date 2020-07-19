import React, { useState } from 'react';
import Button from '../../../utils/Button';
import { connect } from 'react-redux';
import { addBrand } from '../../../actions/productAction';
import axios from 'axios';

const ManageBrands = ({ brands, addBrand }) => {
    const [submitedBrand, setSubmitedBrand] = useState({
        name: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setSubmitedBrand({ ...submitedBrand, [e.target.name]: e.target.value });
        setErrorMessage('');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        try {
            await axios.post('/api/products/brand', submitedBrand);
            addBrand(submitedBrand);
            setSubmitedBrand({
                name: ""
            });
            setSuccessMessage('Add brand successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Add brand failed');
        }
    }

    const showBrands = () => brands.map((brand, i) =>
        <div className='category_item' key={i}>
            {brand.name}
        </div>
    )

    const { name } = submitedBrand;

    return (
        <div className='admin_category_wrapper'>
            <h1>Brands</h1>
            <div className='admin_two_column'>
                <div className='left'>
                    <div className='brands_container'>
                        {showBrands()}
                    </div>
                </div>
                <div className='right'>
                    <h2>Add Brand</h2>
                    <form onSubmit={onSubmit}>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                            placeholder='Enter brand name'
                        />

                        {errorMessage && <div className='error_label'>{errorMessage}</div>}
                        {successMessage && <div className='form_success'>{successMessage}</div>}
                        <Button
                            type='submit'
                            title='ADD BRAND'
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </form>
                </div>
            </div>

        </div>
    );
}

export default connect(null, { addBrand })(ManageBrands);

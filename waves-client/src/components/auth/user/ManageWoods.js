import React, { useState } from 'react';
import Button from '../../../utils/Button';
import { connect } from 'react-redux';
import { addWood } from '../../../actions/productAction';
import axios from 'axios';

const ManageWoods = ({ woods, addWood }) => {

    const [submitedWood, setSubmitedWood] = useState({
        name: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setSubmitedWood({ ...submitedWood, [e.target.name]: e.target.value });
        setErrorMessage('');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        try {
            await axios.post('/api/products/wood', submitedWood);
            addWood(submitedWood);
            setSubmitedWood({
                name: ""
            });
            setSuccessMessage('Add wood successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Add wood failed');
        }

    }

    const showWoods = () => woods.map((wood, i) =>
        <div className='category_item' key={i}>
            {wood.name}
        </div>
    )

    const { name } = submitedWood;

    return (
        <div className='admin_category_wrapper'>
            <h1>Brands</h1>
            <div className='admin_two_column'>
                <div className='left'>
                    <div className='brands_container'>
                        {showWoods()}
                    </div>
                </div>
                <div className='right'>
                    <h2>Add Wood</h2>
                    <form onSubmit={onSubmit}>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                            placeholder='Enter wood name'
                        />

                        {errorMessage && <div className='error_label'>{errorMessage}</div>}
                        {successMessage && <div className='form_success'>{successMessage}</div>}
                        <Button
                            type='submit'
                            title='ADD WOOD'
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

export default connect(null, { addWood })(ManageWoods);

import React, { useState, useEffect } from 'react';
import UserLayout from '../auth/user/UserLayout';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct } from '../../actions/productAction';
import Button from '../../utils/Button';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const AddProduct = ({ getBrands, getWoods, addProduct, product }) => {

    const [submitedProduct, setSubmitedProduct] = useState({
        name: "",
        description: "",
        price: 0,
        brand: "",
        shipping: false,
        available: false,
        wood: "",
        frets: 0,
        sold: 0,
        publish: false,
        images: []
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(submitedProduct);

        setErrorMessage('');
        try {
            await axios.post('/api/products/article', submitedProduct);
            addProduct(submitedProduct);

            setSuccessMessage('Add product successfully');
            setSubmitedProduct({
                name: "",
                description: "",
                price: 0,
                brand: "",
                shipping: false,
                available: false,
                wood: "",
                frets: 0,
                sold: 0,
                publish: false,
                images: []
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrorMessage('Add product failed');
        }

    }

    const handleChange = (e) => {
        setSubmitedProduct({ ...submitedProduct, [e.target.name]: e.target.value });
        setErrorMessage('');
    }

    const buildBrandOptions = () =>
        product.brands.map((brand, i) =>
            <option key={i} value={brand._id}>{brand.name}</option>
        )

    const buildWoodOptions = () =>
        product.woods.map((wood, i) =>
            <option key={i} value={wood._id}>{wood.name}</option>
        )

    const imageUploadHandler = (files) => {
        const newSubmitedProduct = { ...submitedProduct };
        newSubmitedProduct['images'] = files;
        setSubmitedProduct(newSubmitedProduct);
    }

    const { name, description, price, brand, wood, shipping, available, frets, publish } = submitedProduct;

    return (
        <UserLayout>
            <div>
                <h1>Add Product</h1>
                <form onSubmit={onSubmit}>
                    <FileUpload imageUploadHandler={imageUploadHandler} />
                    <input
                        className='input'
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        required
                        placeholder='Enter product name'
                    />
                    <textarea
                        className='input'
                        name='description'
                        value={description}
                        onChange={handleChange}
                        required
                        placeholder='Enter product description'
                    />
                    <input
                        className='input'
                        type='number'
                        name='price'
                        value={price}
                        onChange={handleChange}
                        required
                        placeholder='Enter product price'
                    />
                    <label className='label_inputs' htmlFor="brand">Select brand</label>
                    <select
                        className='input'
                        name="brand"
                        value={brand}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select</option>
                        {buildBrandOptions()}
                    </select>
                    <label className='label_inputs' htmlFor="shipping">Is shipping?</label>
                    <select
                        className='input'
                        name="shipping"
                        value={shipping}
                        onChange={handleChange}
                        required
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label className='label_inputs' htmlFor="available">Available in stock?</label>
                    <select
                        className='input'
                        name="available"
                        value={available}
                        onChange={handleChange}
                        required
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label className='label_inputs' htmlFor="wood">Select wood</label>
                    <select
                        className='input'
                        name="wood"
                        value={wood}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select</option>
                        {buildWoodOptions()}
                    </select>
                    <label className='label_inputs' htmlFor="frets">Select frets</label>
                    <select
                        className='input'
                        name="frets"
                        value={frets}
                        onChange={handleChange}
                        required
                    >
                        <option value={20}>20</option>
                        <option value={21}>21</option>
                        <option value={22}>22</option>
                        <option value={23}>23</option>
                    </select>
                    <label className='label_inputs' htmlFor="frets">Publish</label>
                    <select
                        className='input'
                        name="publish"
                        value={publish}
                        onChange={handleChange}
                        required
                    >
                        <option value={true}>Public</option>
                        <option value={false}>Hidden</option>
                    </select>
                    {errorMessage && <div className='error_label'>{errorMessage}</div>}
                    {successMessage && <div className='form_success'>{successMessage}</div>}
                    <Button
                        type='submit'
                        title='ADD PRODUCT'
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                    />
                </form>
            </div>
        </UserLayout>

    );
}

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getBrands, getWoods, addProduct })(AddProduct);
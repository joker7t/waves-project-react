import React, { useState, useEffect } from 'react';
import UserLayout from '../auth/user/UserLayout';
import { connect } from 'react-redux';
import { getBrands, getWoods, getShop } from '../../actions/productAction';
import Button from '../../utils/Button';
import axios from 'axios';

const AddProduct = ({ getBrands, getWoods, getShop, product }) => {

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

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setSubmitedProduct({ ...submitedProduct, [e.target.name]: e.target.value });
    }

    const buildBrandOptions = () =>
        product.brands.map((brand, i) =>
            <option key={i} value={brand._id}>{brand.name}</option>
        )

    const buildWoodOptions = () =>
        product.woods.map((wood, i) =>
            <option key={i} value={wood._id}>{wood.name}</option>
        )

    const { name, description, price, brand, wood, shipping, available, frets, publish } = submitedProduct;

    return (
        <UserLayout>
            <div>
                <h1>Add Product</h1>
                <form onSubmit={onSubmit}>
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
                    <label for="brand">Select brand</label>
                    <select
                        className='input'
                        name="brand"
                        value={brand}
                        onChange={handleChange}
                        required
                    >
                        {buildBrandOptions()}
                    </select>
                    <label for="shipping">Is shipping?</label>
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
                    <label for="available">Available in stock?</label>
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
                    <label for="wood">Select wood</label>
                    <select
                        className='input'
                        name="wood"
                        value={wood}
                        onChange={handleChange}
                        required
                    >
                        {buildWoodOptions()}
                    </select>
                    <label for="frets">Select frets</label>
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
                    <label for="frets">Publish</label>
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

export default connect(mapStateToProps, { getBrands, getWoods, getShop })(AddProduct);
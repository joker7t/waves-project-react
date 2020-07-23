import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { connect } from 'react-redux';
import axios from 'axios';
import UserProductBlock from './UserProductBlock';
import Loader from '../../../utils/Loader';

const UserCart = ({ user, userDetails }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const items = [];

            userDetails && userDetails.carts && userDetails.carts.length > 0 && userDetails.carts.map(cart => {
                items.push(cart.id);
            })

            if (items.length > 0) {
                try {
                    const res = await axios.get(`/api/products/article?type=array&id=${items}`);
                    const datas = res.data.productdata;
                    const datasWithQuantity = [];
                    datas.forEach(data => {
                        userDetails.carts.forEach(cart => {
                            if (cart.id === data._id) {
                                datasWithQuantity.push({
                                    ...data,
                                    quantity: cart.quantity
                                });
                            }
                        })
                    })
                    setCartItems(datasWithQuantity);
                } catch (error) {
                    console.log(error);
                }
            }
            setIsLoading(false);
        };

        loadData();

        //eslint-disable-next-line
    }, [userDetails]);

    const removeItem = (id) => {
        console.log(id)
    }

    return (
        <UserLayout>
            {isLoading ?
                <Loader />
                :
                <div>
                    <h1>My Cart</h1>
                    <div>
                        <UserProductBlock
                            products={cartItems}
                            type='cart'
                            removeItem={removeItem}
                        />
                    </div>
                </div>
            }
        </UserLayout>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userDetails: state.auth.userDetails
});

export default connect(mapStateToProps, null)(UserCart);
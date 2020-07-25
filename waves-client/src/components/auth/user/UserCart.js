import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { connect } from 'react-redux';
import axios from 'axios';
import UserProductBlock from './UserProductBlock';
import Loader from '../../../utils/Loader';
import { removeFromCart } from '../../../actions/userAction';
import Paypal from './Paypal';

const UserCart = ({ userDetails, removeFromCart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showTotal, setShowTotal] = useState(false);
    const [total, setTotal] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (cartItems.length === 0) {
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
                        calculateTotal(datasWithQuantity);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setCartItems([]);
                    calculateTotal([]);
                }
                setIsLoading(false);
            } else {
                calculateTotal(cartItems);
            }
        };

        loadData();

        //eslint-disable-next-line
    }, [userDetails]);

    const calculateTotal = (datas) => {
        if (datas.length !== 0) {
            let totalPrice = 0;
            datas.forEach(data => {
                totalPrice = totalPrice + (parseInt(data.price) * parseInt(data.quantity));
            });
            setTotal(totalPrice);
            setShowTotal(true);
        } else {
            setShowTotal(false);
        }
    }

    const removeItem = async (id) => {
        try {
            await axios.delete(`/api/users/remove-from-cart?_id=${id}`);
            setCartItems(cartItems.filter(item => item._id !== id));
            removeFromCart(id);
        } catch (error) {
            console.log(error);
        }
    }

    const transactionError = (error) => {
        console.log(error);
    }

    const transactionCanceled = (canceled) => {
        console.log(canceled);
    }

    const transactionSuccess = (data) => {
        console.log(data);
        setCartItems([]);
        calculateTotal([]);
        setShowSuccess(true);
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
                        {showTotal ?
                            <div>
                                <div className='user_cart_sum'>
                                    <div>
                                        Total amount: $ {total}
                                    </div>
                                </div>
                                <div className='paypal_button_container'>
                                    <Paypal
                                        toPay={total}
                                        transactionError={transactionError}
                                        transactionCanceled={transactionCanceled}
                                        onSuccess={transactionSuccess}
                                    />
                                </div>
                            </div>
                            :
                            showSuccess ?
                                <div className='cart_success'>
                                    <FontAwesomeIcon icon={faSmile} />
                                    <div>
                                        THANK YOU
                                    </div>
                                    <div>
                                        YOUR ORDER IS NOW COMPLETE
                                    </div>
                                </div>
                                :
                                <div className='cart_no_items'>
                                    <FontAwesomeIcon icon={faFrown} />
                                    <div>
                                        You have no items
                                    </div>
                                </div>
                        }
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

export default connect(mapStateToProps, { removeFromCart })(UserCart);
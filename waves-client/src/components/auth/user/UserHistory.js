import React from 'react';
import moment from 'moment';

const UserHistory = ({ products }) => {

    const renderHistories = () =>
        products.map((product, i) =>
            <tr key={i}>
                <td>{moment(product.dateOfPurchase).format('MM-DD-YYYY')}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.quantity}</td>
            </tr>
        )

    return (
        <div style={{ width: '100%' }}>
            <table>
                <thead>
                    <tr>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderHistories()}
                </tbody>
            </table>
        </div>
    );
}

export default UserHistory;

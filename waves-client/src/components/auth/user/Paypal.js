import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Paypal = ({ toPay, transactionError, transactionCanceled, onSuccess }) => {
    const client = {
        sandbox: 'YOUR-SANDBOX-APP-ID',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    return (
        <div>
            <PaypalExpressBtn
                client={client}
                currency={'USD'}
                total={toPay}
                onError={transactionError}
                onSuccess={onSuccess}
                onCancel={transactionCanceled}
                style={{
                    size: 'large',
                    color: 'blue',
                    shape: 'rect',
                    label: 'checkout'
                }}
            />
        </div>
    );
}

export default Paypal;

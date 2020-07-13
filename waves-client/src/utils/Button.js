import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ type, title, linkTo, addStyles, altClass, action }) => {

    const buttons = () => {
        let template = '';
        switch (type) {
            case 'default':
                template =
                    <Link
                        to={linkTo}
                        style={addStyles}
                        className={altClass ? altClass : 'link_default'}
                    >
                        {title}
                    </Link>
                    ;
                break;
            case 'submit':
                template =
                    <button
                        style={addStyles}
                        className='link_default'
                    >
                        {title}
                    </button>
                    ;
                break;
            default:
                template = '';
        }
        return template;
    }

    return (
        <div className='my_link'>
            {buttons()}
        </div>
    );
}

export default Button;

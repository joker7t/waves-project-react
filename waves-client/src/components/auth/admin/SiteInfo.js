import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../../utils/Button';
import { connect } from 'react-redux';
import { setSiteInfo } from '../../../actions/siteAction';

const SiteInfo = ({ setSiteInfo, siteInfo }) => {
    const [submitedSiteInfo, setSubmitedSiteInfo] = useState({
        //ID need to determine while updating
        _id: '',
        address: '',
        phone: '',
        workingHour: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        setSubmitedSiteInfo(siteInfo);

        //eslint-disable-next-line
    }, [siteInfo]);

    const handleChange = (e) => {
        setSubmitedSiteInfo({ ...submitedSiteInfo, [e.target.name]: e.target.value });
        setErrorMessage(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/sites/update-site-data', submitedSiteInfo);
            setSiteInfo(res.data);

            setSuccessMessage('Update successfully');
            setErrorMessage(null);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.log(error);
            setErrorMessage('Update failed');
        }
    }

    return (
        <div style={{ paddingRight: '10px' }}>
            <h1>Site Info</h1>
            <form onSubmit={onSubmit}>
                <label className='label_inputs' htmlFor="address">Address</label>
                <input
                    type='text'
                    name='address'
                    value={submitedSiteInfo.address}
                    onChange={handleChange}
                    required
                    placeholder='Enter site address'
                />
                <label className='label_inputs' htmlFor="phone">Phone</label>
                <input
                    type='text'
                    name='phone'
                    value={submitedSiteInfo.phone}
                    onChange={handleChange}
                    required
                    placeholder='Enter site phone'
                />
                <label className='label_inputs' htmlFor="workingHour">Working Hour</label>
                <input
                    type='text'
                    name='workingHour'
                    value={submitedSiteInfo.workingHour}
                    onChange={handleChange}
                    required
                    placeholder='Enter site working hour'
                />
                <label className='label_inputs' htmlFor="email">Email</label>
                <input
                    type='email'
                    name='email'
                    value={submitedSiteInfo.email}
                    onChange={handleChange}
                    required
                    placeholder='Enter site email'
                />
                {errorMessage && <div className='error_label'>{errorMessage}</div>}
                {successMessage && <div className='form_success'>{successMessage}</div>}
                <Button
                    type='submit'
                    title='UPDATE SITE INFO'
                    addStyles={{
                        margin: '10px 0 0 0',
                        padding: '10px 20px 10px 20px'
                    }}
                />
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    siteInfo: state.site.data
});

export default connect(mapStateToProps, { setSiteInfo })(SiteInfo);
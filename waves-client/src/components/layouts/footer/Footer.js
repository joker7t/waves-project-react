import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import { connect } from 'react-redux';
import { setSiteInfo } from '../../../actions/siteAction';
import axios from 'axios';

const Footer = ({ setSiteInfo, siteInfo }) => {

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get('/api/sites/site-data');
                setSiteInfo(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();

        //eslint-disable-next-line
    }, []);

    return (
        <footer className='bck_b_dark' style={{ paddingBottom: '20px' }}>
            <div className='container'>
                <div className='logo'>
                    Waves
                </div>
                <div className='wrapper'>
                    <div className='left'>
                        <h2>Contact Information</h2>
                        <div className='business_nfo'>
                            <div className='tag'>
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className='icon'
                                />
                                <div className='nfo'>
                                    <div>Address</div>
                                    <div>{siteInfo.address}</div>
                                </div>
                            </div>

                            <div className='tag'>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className='icon'
                                />
                                <div className='nfo'>
                                    <div>Phone</div>
                                    <div>{siteInfo.phone}</div>
                                </div>
                            </div>

                            <div className='tag'>
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className='icon'
                                />
                                <div className='nfo'>
                                    <div>Working Hour</div>
                                    <div>{siteInfo.workingHour}</div>
                                </div>
                            </div>

                            <div className='tag'>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className='icon'
                                />
                                <div className='nfo'>
                                    <div>Email</div>
                                    <div>{siteInfo.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <h2>Be the first to know</h2>
                        Get all the lastest information on events, sales and offers. You can miss out
                    </div>
                </div>
            </div>
        </footer>
    );
}

const mapStateToProps = (state) => ({
    siteInfo: state.site.data
});

export default connect(mapStateToProps, { setSiteInfo })(Footer);

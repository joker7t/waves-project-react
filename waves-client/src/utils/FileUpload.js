import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const FileUpload = ({ imageUploadHandler }) => {
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = async (files) => {
        setUploading(true);
        try {
            let formData = new FormData();
            const config = {
                header: {
                    'content-type': 'multipart/form-data'
                }
            };
            formData.append('file', files[0]);
            const res = await axios.post('/api/users/uploadimage', formData, config);

            const newUploadFiles = [
                ...uploadFiles,
                res.data
            ];
            setUploadFiles(newUploadFiles);
            imageUploadHandler(newUploadFiles);
        } catch (error) {
            console.log(error);
        }
        setUploading(false);
    }

    const deleteImage = async (imageId) => {
        try {
            await axios.delete(`/api/users/removeimage?public_id=${imageId}`);
            const newUploadFiles = uploadFiles.filter(file => file.public_id !== imageId);
            setUploadFiles(newUploadFiles);
            imageUploadHandler(newUploadFiles);
        } catch (error) {
            console.log(error);
        }

    }

    const showUploadImages = () =>
        uploadFiles.map(file =>
            <div className='dropzone_box'
                key={file.public_id}
                onClick={() => deleteImage(file.public_id)}
            >
                <div
                    className='wrap'
                    style={{ background: `url(${file.url}) no-repeat` }}
                >
                </div>

            </div>
        )


    return (
        <div>
            <section>
                <div className='dropzone clear'>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}

                    >
                        {({ getRootProps, getInputProps }) => (
                            <section className='dropzone_box'>
                                <div {...getRootProps()} style={{ height: '100%' }}>
                                    <input {...getInputProps()} />
                                    <div className='wrap'>
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    {showUploadImages()}
                    {
                        uploading ?
                            <div
                                className='dropzone_box'
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '60px'
                                }}
                            >
                                <CircularProgress
                                    style={{ color: '#00bcd4' }}
                                    thickness={7}
                                />
                            </div>
                            : null
                    }
                    <span
                        style={{
                            display: 'block',
                            clear: 'both',
                            paddingLeft: '10px',
                            fontStyle: 'italic',
                        }}
                    >
                        **Click to image to remove uploaded one
                    </span>
                </div>
            </section>
        </div>
    );
}

export default FileUpload;

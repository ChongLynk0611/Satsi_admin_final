import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';

import Thumb from 'components/Thumb/Thumb';

import './Banner.css';

import BannerApi from 'api/BannerApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';

function Banner() {
    const [images, setImages] = useState();
    const initValues = {
        Image:""
    }
 
    useEffect(() => {
       fetchData(BannerApi.getBanner, setImages);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(BannerApi.deleteBanner, setImages, id);
        }
    }

    const hanldeSubmit = (values) => {
        let data = new FormData();
        data.append("Image", values.Image);
        postData(BannerApi.postBanner, setImages, data);
        values.Image = "";
    }

    return (
        <div className="Banner">
            <p className="B-title"> Danh sách banners</p>
            <div className="B-body">
                {images && images.map((image, index) => (
                    <div className="BannerItem" key={index}>
                        <img src={`${process.env.REACT_APP_API_URL}/${image.Image}`}/>
                        <div 
                            className="btn_delete" 
                            title="Xóa banner"
                            onClick={deleteHandle(image.id)}
                        ><DeleteIcon /></div>
                    </div>
                ))}
            </div>
            <div className="add-banner">
                <p>Thêm ảnh banner :</p>
                <Formik
                    initialValues={initValues}
                    onSubmit = {hanldeSubmit}
                >
                    {({
                        values,
                        handleSubmit,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="ImageSubmit">
                            <input 
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("Image", event.target.files[0]);
                                }}
                                name="Image"
                            />
                            {values.Image && <Thumb file={values.Image} />}
                            <button className="btn-submit" type="submit">Đăng tải</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Banner

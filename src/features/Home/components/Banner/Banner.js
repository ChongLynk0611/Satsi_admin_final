import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import * as yup from 'yup';

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
    
    const validationSchema = yup.object().shape({
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    useEffect(() => {
       fetchData.fetchData(BannerApi.getBanner, setImages);
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
                    validationSchema = {validationSchema}
                    onSubmit = {hanldeSubmit}
                >
                    {({
                        values,
                        errors,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit} className="ImageSubmit">
                            <input 
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("Image", event.target.files[0]);
                                }}
                                name="Image"
                            />
                            {errors["Image"] && <p className="error">{errors["Image"]}</p>}
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

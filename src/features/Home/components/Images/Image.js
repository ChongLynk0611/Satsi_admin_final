import React,{useState, useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './Images.css';

import ImageApi from 'api/ImageApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';

function Image() {
    const [images, setImages] = useState();
    const initialValues = {Image:""};

    useEffect(() => {
        fetchData.fetchData(ImageApi.getImages, setImages);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(ImageApi.deleteImage, setImages, id);
        }
    }

    const hanldeSubmit = (values) => {
        let data = new FormData();
        data.append("Image", values.Image);
        postData(ImageApi.postImage, setImages, data);
        values.Image = "";
    }
    
    const validationSchema = yup.object().shape({
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    return (
        <div className="Images">
            <p className="I-title">Danh sách hình ảnh</p>
            <div className="I-body">
                {images && images.map((image, index) => (
                    <div className="I-image" key={index}>
                        <img src={`${process.env.REACT_APP_API_URL}/${image.Image}`}/>
                        <div 
                            className="btn_delete" 
                            title="Xóa  hình ảnh"
                            onClick={deleteHandle(image.id)}
                        ><DeleteIcon /></div>
                    </div>
                ))}
            </div>
            <div className="add-images">
                <p>Thêm hình ảnh :</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema = {validationSchema}
                    onSubmit = {hanldeSubmit}
                >
                    {({
                        values,
                        errors,
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

export default Image

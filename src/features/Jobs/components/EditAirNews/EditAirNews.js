import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { Formik} from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './EditAirNews.css';

import AirNewsApi from 'api/AirnewsApi';
import fetchData from 'hooks/fetchData';
import updateData from 'hooks/updateData';

function EditAirNews() {
    const {id} = useParams();
    let history = useHistory();
    const [temp, setTemp] = useState();
    const [initialValues, setInitialValues] = useState();
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề '),
        SubContent: yup.string().required('Hãy nhập tiêu đề phụ'),
        Content: yup.string().required('Hãy nhập nội dung'),
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    useEffect(() => {
        fetchData.fetchDataById(AirNewsApi.getAirNewsById, setInitialValues, id);    
    }, []);

    const onSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Content", values.Content);
        data.append("SubContent", values.SubContent);
        data.append("Image", values.Image);
        updateData(AirNewsApi.updateAirNews, setTemp, data, values.id);
        setTimeout(() => {
            history.push("/HocNgheKhoiNghiep");
        },2000);
    }
    
    return (
        <div className="EditAirNews">
            <p className = "EAN-title">Nội dung tin tức</p>
            {initialValues && <Formik 
                initialValues={initialValues}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className = "FormEditNews">
                        <p className="N-text">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="Input-News"
                        />
                        {errors["Title"] && <p className="error">{errors["Title"]}</p>}
                        <p className="N-text">Tiêu đề phụ:</p>
                        <textarea 
                            name="SubContent"
                            value={values.SubContent}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="textarea-News"
                        />
                        {errors["SubContent"] && <p className="error">{errors["SubContent"]}</p>}
                        <p>Ảnh nền: </p>
                        <input 
                            type="file"
                            onChange={(event) => {
                                setFieldValue("Image", event.target.files[0]);
                            }}
                            name="Image"
                            className="Input-Img"
                        />
                        {errors["Image"] && <p className="error">{errors["Image"]}</p>}
                        {typeof(values.Image) === 'string' ? <img src={`${process.env.REACT_APP_API_URL}/${values.Image}`}/> : <Thumb file={values.Image} />}
                        <p className="N-text">Nội dung:</p>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={values.Content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                values.Content = data;
                            }}
                            name="Content"
                        />
                        {errors["Content"] && <p className="error">{errors["Content"]}</p>}
                        <button className="btn-submit" type="submit">Cập nhật</button>
                    </form>
                )}
            </Formik>}
        </div>  
    )
}

export default EditAirNews;

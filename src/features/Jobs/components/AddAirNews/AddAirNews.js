import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Formik} from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';
import Thumb from 'components/Thumb/Thumb';

import './AddAirNews.css';

import AirNewsApi from 'api/AirnewsApi';
import postData from 'hooks/postData';

function AddAirNews() {
    const [temp, setTemp] = useState();
    let history = useHistory();
    const initValues = {Title:'',Content:'', SubContent:'', Image:null};
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề '),
        Content: yup.string().required('Hãy nhập nội dung'),
        SubContent: yup.string().required('Hãy nhập nội dung hiển thị phụ'),
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    const onSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Content", values.Content);
        data.append("SubContent", values.SubContent);
        data.append("Image", values.Image);
        postData(AirNewsApi.postAirNews, setTemp, data);
        setTimeout(() => {
            history.push("/HocNgheKhoiNghiep");
        },2500);
    }
    
    return (
        <div className="AddAirNews">
            <p className = "AN-title">Nội dung tin tức</p>
            <Formik 
                initialValues={initValues}
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
                    <form onSubmit={handleSubmit} className = "FormAirNews">
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
                        {values.Image && <Thumb file={values.Image} />}
                        <p className="N-text">Nội dung:</p>
                        <Editor
                            values = {values.Content}
                            name = "Content"
                            onChange = {v => setFieldValue('Content', v)}

                        />
                        {errors["Content"] && <p className="error">{errors["Content"]}</p>}
                        <button className="btn-submit" type="submit">Đăng bài</button>
                    </form>
                )}
            </Formik>
        </div>  
    )
}

export default AddAirNews;
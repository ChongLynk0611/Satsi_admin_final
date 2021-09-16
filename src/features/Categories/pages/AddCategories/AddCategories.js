import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './AddCategories.css';

import CategoryApi from '../../../../api/CategoryApi';
import postData from 'hooks/postData';
  
function AddCategories(props) {
    const [temp, setTemp] = useState();
    let history = useHistory();
    const initValues = {Title:'',Detail:'',Content:'',Image:null}
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề '),
        Detail: yup.string().required('Hãy nhập chi tiết'),
        Content: yup.string().required('Hãy nhập nội dung'),
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Detail", values.Detail);
        data.append("Content", values.Content);
        data.append("Image", values.Image);

        postData(CategoryApi.postCategory, setTemp, data);
        setTimeout(() => {
            history.push("/DangBai")
        },1000);
        
    }

    return (
        <div className="AdminPage">
            <div className="Admin-body">
                <h2>Nội dung tuyển dụng</h2>
                <Formik
                    initialValues={initValues}
                    validationSchema = {validationSchema}
                    onSubmit = {handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="FormCategories">
                            <p className="CategoryName">Tiêu đề:</p>
                            <input 
                                name="Title"
                                value={values.Title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="Input-category"
                            />
                            {errors["Title"] && <p className="error">{errors["Title"]}</p>}
                            <p>Chi tiết:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.Detail}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.Detail = data;
                                }}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                // onBlur={ handleBlur }
                                name="Detail"
                            />
                            {errors["Detail"] && <p className="error">{errors["Detail"]}</p>}
                            <p>Nội dung:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.Content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.Content = data;
                                }}
                                // onBlur={ handleBlur }
                                name="Content"
                            />
                            {errors["Content"] && <p className="error">{errors["Content"]}</p>}
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
                            <button className="btn-submit" type="submit">Đăng tải</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddCategories;


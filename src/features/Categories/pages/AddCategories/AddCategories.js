import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as Yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './AddCategories.css';

import CategoryApi from '../../../../api/CategoryApi';
import postData from 'hooks/postData';
  
function AddCategories(props) {
    const [temp, setTemp] = useState();
    let history = useHistory();

    const initValues = {
        Title:'',
        Detail:'',
        Content:'',
        Image:'',
        SubTitle:'',
        ImgTitle:'',
        ImgSubTitle:''
    }

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Detail", values.Detail);
        data.append("Content", values.Content);
        data.append("Image", values.Image);
        data.append("SubTitle", values.SubTitle);
        data.append("ImgTitle", values.ImgTitle);
        data.append("ImgSubTitle", values.ImgSubTitle);

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
                        <form onSubmit={handleSubmit} className="formSubmit">
                            <p className="CategoryName">Tiêu đề:</p>
                            <input 
                                name="Title"
                                value={values.Title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="Input-category"
                            />
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
                            <p>Tiêu đề phụ:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.SubTitle}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.SubTitle = data;
                                }}
                                // onBlur={ handleBlur }
                                name="SubTitle"
                            />
                            <p>Ảnh nền: </p>
                            <input 
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("Image", event.target.files[0]);
                                }}
                                name="Image"
                                className="Input-Img"
                            />
                            {values.Image && <Thumb file={values.Image} />}
                            
                            <p>Tiêu đề hình ảnh:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.ImgTitle}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.ImgTitle = data;
                                }}
                                // onBlur={ handleBlur }
                                name="ImgTitle"
                            />
                            <p>Tiêu đề phụ hình ảnh:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.ImgSubTitle}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.ImgSubTitle = data;
                                }}
                                // onBlur={ handleBlur }
                                name="ImgSubTitle"
                            />
                            <button className="btn-submit" type="submit">Đăng tải</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddCategories;


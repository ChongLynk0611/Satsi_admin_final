import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './EditCategory.css';

import CategoryApi from 'api/CategoryApi';
import fetchData from 'hooks/fetchData';
import updateData from 'hooks/updateData';

function EditCategory() {
    const {id} = useParams();
    let history = useHistory();
    const [temp, setTemp] = useState();
    const [initialValues, setInitialValues] = useState();
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề '),
        Detail: yup.string().required('Hãy nhập chi tiết'),
        Content: yup.string().required('Hãy nhập nội dung'),
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    useEffect(() =>{
        fetchData.fetchDataById(CategoryApi.getCategory, setInitialValues, id);
    },[]);

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Detail", values.Detail);
        data.append("Content", values.Content);
        data.append("Image", values.Image);
        console.log(values);
        updateData(CategoryApi.updateCategory, setTemp, data, values.id);
        setTimeout(() => {
            history.push("/DangBai");
        },1000);
    }

    return (
        <div className="EditCategory">
            <p className="EC-title">Cập nhật bài đăng</p>
            {initialValues && 
            <Formik
                initialValues={initialValues}
                validationSchema = {validationSchema}
                onSubmit = {handleSubmit}
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
                    <form onSubmit={handleSubmit} className="FormEditCategories">
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
                        {typeof(values.Image) === 'string' ? <img src={`${process.env.REACT_APP_API_URL}/${values.Image}`}/> : <Thumb file={values.Image} />}
                        <button className="btn-submit" type="submit">Đăng tải</button>
                    </form>
                )}
            </Formik>
            }   
        </div>
    )
}

export default EditCategory;


import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Thumb from 'components/Thumb/Thumb';

import './EditCategory.css';

import CategoryApi from 'api/CategoryApi';
import fetchData from 'hooks/fetchData';
import updateData from 'hooks/updateData';

function EditCategory() {
    const {id} = useParams();
    let history = useHistory();
    const [initialValues, setInitialValues] = useState();
    const [temp, setTemp] = useState();

    useEffect(() =>{
        fetchData.fetchDataById(CategoryApi.getCategory, setInitialValues, id);
    },[]);

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Detail", values.Detail);
        data.append("Content", values.Content);
        data.append("Image", values.Image);

        updateData(CategoryApi.updateCategory, setTemp, data, values.id);
        setTimeout(() => {
            history.push("/DangBai")
        },1000);
    }

    return (
        <div className="EditCategory">
            <p className="EC-title">Cập nhật bài đăng</p>
            {initialValues && 
            <Formik
                initialValues={initialValues}
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
                        <p>Ảnh nền: </p>
                        <input 
                            type="file"
                            onChange={(event) => {
                                setFieldValue("Image", event.target.files[0]);
                            }}
                            name="Image"
                            className="Input-Img"
                        />
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


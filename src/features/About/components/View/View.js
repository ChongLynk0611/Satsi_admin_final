import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './View.css';

import ViewApi from 'api/ViewApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function View() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(ViewApi.getView, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(ViewApi.updateView, setInitialValues, values, values.id);
    }

    return (
        <div className="View">
            <p className="V-title">Tầm nhìn</p>
            {initialvalues && <Formik 
                initialValues={initialvalues[0]}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className = "FormNews">
                        <p className="V-text">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="Input-Text"
                        />
                        <p className="V-text">Nội dung:</p>
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

export default View

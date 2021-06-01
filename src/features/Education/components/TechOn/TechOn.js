import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';

import './TechOn.css';

import TeachOnApi from 'api/TechOn';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function TechOn() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(TeachOnApi.getTeachOnl, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(TeachOnApi.updateTeachOnl, setInitialValues, values, values.id);
    }

    return (
        <div className="TechOn">
            <p className="TO-title">Đào tạo trực tuyến</p>
            {initialvalues && <Formik 
                initialValues={initialvalues[0]}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className = "FormTechOn">
                        <p className="TO-SubTitle">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="TO-Input"
                        />
                        <p className="TO-SubTitle">Nội dung:</p>
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

export default TechOn;

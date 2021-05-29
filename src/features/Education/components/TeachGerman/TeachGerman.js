import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';

import './TeachGerman.css';

import TeachGermanApi from 'api/TeachGermanApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function TeachGerman() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(TeachGermanApi.getTeachGerman, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(TeachGermanApi.updateTeachGerman, setInitialValues, values, values.id);
    }

    return (
        <div className="TeachGerman">
            <p className="TG-title">Đào tạo tiếng Đức</p>
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
                    <form onSubmit={handleSubmit} className = "FormTeachGerman">
                        <p className="TG-SubTitle">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="TG-Input"
                        />
                        <p className="TG-SubTitle">Nội dung:</p>
                        <Editor
                            values = {values.Content}
                            defaultValue = {values.Content}
                            name = "Content"
                            onChange = {v => setFieldValue('Content', v)}
                        />
                        {errors["Content"] && <p className="error">{errors["Content"]}</p>}
                        <button className="btn-submit" type="submit">Cập nhật</button>
                    </form>
                )}
            </Formik>}
        </div>
    )
}

export default TeachGerman;

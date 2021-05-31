import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';

import './ActivityPage.css';

import ActivityApi from 'api/ActivityApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function ActivityPage() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(ActivityApi.getActivity, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(ActivityApi.updateActivity, setInitialValues, values, values.id);
    }

    return (
        <div className="ActivityPage">
            <p className="Ac-title">Hoạt động của học viên</p>
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
                    <form onSubmit={handleSubmit} className = "FormActivity">
                        <p className="Ac-text">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="Input-News"
                        />
                        <p className="Ac-text">Nội dung:</p>
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

export default ActivityPage

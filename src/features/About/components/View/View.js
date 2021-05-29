import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';

import './View.css';

import ViewApi from 'api/ViewApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function View() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
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
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className = "FormNews">
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

export default View

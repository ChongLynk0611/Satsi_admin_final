import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';

import './RoadMapPage.css';

import RoadMapApi from 'api/RoadMapApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function RoadMapPage() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Detail: yup.string().required('Hãy nhập chi tiết'),
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(RoadMapApi.getRoadMap, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(RoadMapApi.updateRoadMap, setInitialValues, values, values.id);
    }

    return (
        <div className="RoadMapPage">
            <p className="R-title">Lộ trình du học</p>
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
                    <form onSubmit={handleSubmit} className = "FormNews">
                        <p className="R-subTitle">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="Input-RoadMap"
                        />
                        {errors["Title"] && <p className="error">{errors["Title"]}</p>}
                        <p className="R-subTitle">Chi tiết:</p>
                        <textarea 
                            name="Detail"
                            value={values.Detail}
                            onChange={handleChange}
                            className="textarea-RoadMap"
                        />
                        {errors["Detail"] && <p className="error">{errors["Detail"]}</p>}
                        <p className="R-subTitle">Nội dung:</p>
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

export default RoadMapPage;

import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

import Editor from 'components/Editor/Editor';

import './Mission.css';

import MissionApi from 'api/MissionApi';
import updateData from 'hooks/updateData';
import fetchData from 'hooks/fetchData';

function View() {
    const [initialvalues, setInitialValues] = useState();

    const validationSchema = yup.object().shape({
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(MissionApi.getMission, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        updateData(MissionApi.updateMission, setInitialValues, values, values.id);
    }
    
    return (
        <div className="Mission">
            <p className="M-title">Sứ mệnh - Giá trị cốt lõi</p>
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

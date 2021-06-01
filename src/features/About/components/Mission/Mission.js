import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';

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
        console.log(values)
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
                    handleChange,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className = "FormNews">
                        <p className="M-text">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="Input-Text"
                        />
                        <p className="M-text">Nội dung:</p>
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
                        <button className="btn-submit" type="submit">Cập nhật</button>
                    </form>
                )}
            </Formik>}
        </div>
    )
}

export default View

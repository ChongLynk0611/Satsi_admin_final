import React,{useState, useEffect} from 'react';
import { Formik} from 'formik';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';
import "./Aviation.css";

import AviationApi from 'api/AviationApi';
import fetchData from 'hooks/fetchData';
import updateData from 'hooks/updateData';

function Aviation() {
    const [initialvalues, setInitialValues] = useState();
    const validationSchema = yup.object().shape({
        Title: yup.string().required('Hãy nhập tiêu đề'),
        Image: yup.mixed().required('Hãy chọn file trước khi sửa')
    })

    useEffect(() => {
        fetchData.fetchData(AviationApi.getAviation, setInitialValues);
    },[]);

    const onSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Image", values.Image);
        updateData(AviationApi.updateAviation, setInitialValues, data, values.id);
    }

    return (
        <div className="Aviation">
            <p className="A-title">Ngành hàng không</p>
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
                    <form onSubmit={handleSubmit} className = "FormAviation">
                        <p className="A-SubTitle">Tiêu đề:</p>
                        <input 
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                            className="A-Input"
                        />
                        {errors["Title"] && <p className="error">{errors["Title"]}</p>}
                        <p className="A-SubTitle">Ảnh nền:</p>
                        <input 
                            type="file"
                            onChange={(event) => {
                                setFieldValue("Image", event.target.files[0]);
                            }}
                            name="Image"
                        />
                        {errors["Image"] && <p className="error">{errors["Image"]}</p>}
                        {
                            typeof(values.Image) === 'string' ? <img src={`${process.env.REACT_APP_API_URL}/${values.Image}`}/> : <Thumb file={values.Image} />
                        }
                        <button className="btn-submit" type="submit">Cập nhật</button>
                    </form>
                )}
            </Formik>}
        </div>
    )
}

export default Aviation

import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './Diagram.css';

import DiagramApi from 'api/DiagramApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';
import { NaturePeopleOutlined } from '@material-ui/icons';

function Diagram() {
    const [images, setImages] = useState();
    const initValues = {Image:null}
    
    const validationSchema = yup.object().shape({
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải')
    })

    useEffect(() => {
       fetchData.fetchData(DiagramApi.getDiagram, setImages);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(DiagramApi.deleteDiagram, setImages, id);
        }
    }

    const hanldeSubmit = (values) => {
        let data = new FormData();
        data.append("Image", values.Image);
        postData(DiagramApi.postDiagram, setImages, data);
        values.Image = null;
    }

    return (
        <div className="Diagram">
            <p className="D-title"> Sơ đồ lãnh đạo</p>
            <div className="D-body">
                {images && images.map((image, index) => (
                    <div className="DiagramItem" key={index}>
                        <img src={`${process.env.REACT_APP_API_URL}/${image.Image}`}/>
                        <div 
                            className="btn_delete" 
                            title="Xóa ảnh"
                            onClick={deleteHandle(image.id)}
                        ><DeleteIcon /></div>
                    </div>
                ))}
            </div>
            <div className="add-Diagram">
                <p>Thêm ảnh :</p>
                <Formik
                    initialValues={initValues}
                    validationSchema = {validationSchema}
                    onSubmit = {hanldeSubmit}
                >
                    {({
                        values,
                        errors,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit} className="FormDiagram">
                            <input 
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("Image", event.target.files[0]);
                                }}
                                name="Image"
                            />
                            {errors["Image"] && <p className="error">{errors["Image"]}</p>}
                            {values.Image && <Thumb file={values.Image} />}
                            <button className="btn-submit" type="submit">Đăng tải</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Diagram;

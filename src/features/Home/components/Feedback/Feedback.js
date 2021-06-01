import React,{useState, useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './Feedback.css';

import FeedbackApi from 'api/FeedbackApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';
import updateData from 'hooks/updateData';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState();
    const [reload, setReload] = useState(true);
    const intialValues = {id:"", PersonName:"", PersonDetail:"", Content:"", Image:null};

    const validationSchema = yup.object().shape({
        PersonName: yup.string().required('Hãy nhập tên'),
        PersonDetail: yup.string().required('Hãy nhập chi tiết'),
        Content: yup.string().required('Hãy nhập nội dung'),
        Image: yup.mixed().required('Hãy chọn file trước khi đăng')
    })

    useEffect(() => {
        fetchData.fetchData(FeedbackApi.getFeedbacks, setFeedbacks);
    },[]);

    const deleteHanlde = (id) =>{
        return () => {
            deleteData(FeedbackApi.deleteFeedback, setFeedbacks, id);
        }
    }

    const chooseFeedback = (item, values) => {
        return () => {
            values.id = item.id;
            values.PersonName = item.PersonName;
            values.PersonDetail = item.PersonDetail;
            values.Content = item.Content;
            values.Image = item.Image;
            setReload(!reload);
        }
    }

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("PersonName", values.PersonName);
        data.append("PersonDetail", values.PersonDetail);
        data.append("Content", values.Content);
        data.append("Image", values.Image);

        if(values.id === ""){
            //Trường hợp thêm mới
            postData(FeedbackApi.postFeedback, setFeedbacks, data);
        }else{
            //Trường hợp cập nhật
            updateData(FeedbackApi.updateFeedback, setFeedbacks, data, values.id);
        }
        values.id = "";
        values.PersonName = "";
        values.PersonDetail = "";
        values.Content = "";
        values.Image = null;
    }
    const Addhanlde = (values) => {
        return () => {
            values.id = "";
            values.PersonName = "";
            values.PersonDetail = "";
            values.Content = "";
            values.Image = null;
            setReload(!reload);
        }
    }

    return (
        <div className="Feedback">
            <Formik
                initialValues={intialValues}
                validationSchema = {validationSchema}
                onSubmit = {handleSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <div>
                        <p className="F-title">Cảm nhận của học viên</p>
                        <div className="btn_Them" onClick={Addhanlde(values)}>
                            <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                            <span>Thêm mới</span>
                        </div>
                        <div className="F-body">
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Chi tiết</th>
                                    <th>Nội dung</th>
                                    <th>Xóa</th>
                                    <th>Sửa</th>
                                </tr>
                            </table>
                            {feedbacks && 
                                feedbacks.map((item, index) => (
                                    <tr>
                                        <td>{item.PersonName}</td>
                                        <td>{item.PersonDetail}</td>
                                        <td>{item.Content}</td>
                                        <td className="F-icon" onClick={deleteHanlde(item.id)} title="Xóa cam kết"><DeleteIcon /></td>
                                        <td className="F-icon" onClick={chooseFeedback(item, values)} title="Sửa cam kết"><EditIcon /></td>
                                    </tr>   
                                ))

                            }
                        </div>
                        <div className="F-curent">
                            <p className="F-title">Chi tiết cảm nhận</p>
                            <form onSubmit={handleSubmit} className="ImageSubmit">
                                <p className="F-subTitle">Tên:</p>
                                <input 
                                    name="PersonName"
                                    value={values.PersonName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="Input-Feedback"
                                />
                                {errors["PersonName"] && <p className="error">{errors["PersonName"]}</p>}
                                <p className="F-subTitle">Chi tiết:</p>
                                <textarea 
                                    name="PersonDetail"
                                    value={values.PersonDetail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="textarea-Feedback"
                                />
                                {errors["PersonDetail"] && <p className="error">{errors["PersonDetail"]}</p>}
                                <p className="F-subTitle">Nội dung:</p>
                                <textarea 
                                    name="Content"
                                    value={values.Content}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="textarea-Feedback"
                                />
                                {errors["Content"] && <p className="error">{errors["Content"]}</p>}
                                <p className="F-subTitle">Ảnh đại diện: </p>
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
                                <button className="btn-submit" type="submit">{values.id ? "Cập nhật" : "Tạo"}</button>
                            </form>
                        </div>
                    </div>
                    
                )}

            </Formik>
        </div>
    )
}

export default Feedback

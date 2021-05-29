import React,{useState, useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { Formik, validateYupSchema } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

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
    const intialValues = {id:"", PersonName:"", PersonDetail:"", Content:"", Image:""};


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
    }
    return (
        <div className="Feedback">
            <Formik
                initialValues={intialValues}
                onSubmit = {handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <div>
                        <p className="F-title">Phản hồi của học viên</p>
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
                            <p className="F-title">Chi tiết phản hồi</p>
                            <form onSubmit={handleSubmit} className="ImageSubmit">
                                <p className="F-subTitle">Tên:</p>
                                <input 
                                    name="PersonName"
                                    value={values.PersonName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="Input-Feedback"
                                />
                                <p className="F-subTitle">Chi tiết:</p>
                                <textarea 
                                    name="PersonDetail"
                                    value={values.PersonDetail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="textarea-Feedback"
                                />
                                <p className="F-subTitle">Nội dung:</p>
                                <textarea 
                                    name="Content"
                                    value={values.Content}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="textarea-Feedback"
                                />
                                <p className="F-subTitle">Ảnh đại diện: </p>
                                <input 
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("Image", event.target.files[0]);
                                    }}
                                    name="Avatar"
                                />
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

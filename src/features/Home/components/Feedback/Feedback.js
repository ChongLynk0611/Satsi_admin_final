import React,{useState, useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

import './Feedback.css';

import FeedbackApi from 'api/FeedbackApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';
import updateData from 'hooks/updateData';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState();

    useEffect(() => {
        fetchData(FeedbackApi.getFeedbacks, setFeedbacks);
    },[]);

    const deleteHanlde = (id) =>{
        return () => {
            // deleteData(FeedbackApi.deleteFeedback, setFeedbacks, id);
            console.log(id);
        }
    }
    const chooseFeedback = (item, values) => {
        return () => {

        }
    }
    return (
        <div className="Feedback">
            <Formik
                // initialValues={initaValues}
                // onSubmit = {handleSubmit}
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
                        <p className="F-title">Cam kết</p>
                        <div className="F-body">
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Chi tiết</th>
                                    <th>Xóa</th>
                                    <th>Sửa</th>
                                </tr>
                            </table>
                            {feedbacks && 
                                feedbacks.map((item, index) => (
                                    <tr>
                                        <td>{item.Title}</td>
                                        <td>{parse(item.Content)}</td>
                                        <td className="F-icon" onClick={deleteHanlde(item.id)} title="Xóa cam kết"><DeleteIcon /></td>
                                        <td className="F-icon" onClick={chooseFeedback(item, values)} title="Sửa cam kết"><EditIcon /></td>
                                    </tr>   
                                ))

                            }
                        </div>
                        {/* <div className="C-curent">
                            <p className="C-title">Chi tiết cam kết</p>
                            <form onSubmit={handleSubmit} className="ImageSubmit">
                                <p className="C-subTitle">Tiêu đề:</p>
                                <input 
                                    name="Title"
                                    value={values.Title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="Input-commitment"
                                />
                                <p className="C-subTitle">Nội dung:</p>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={values.Content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        values.Content = data;
                                    }}
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    // onBlur={ handleBlur }
                                    name="Content"
                                />
                                <p className="C-subTitle">Ảnh nền: </p>
                                <input 
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("Image", event.target.files[0]);
                                    }}
                                    name="Image"
                                />
                                {
                                    typeof(values.Image) === 'string' ? <img src={`${process.env.REACT_APP_API_URL}/${values.Image}`}/> : <Thumb file={values.Image} />
                                }
                                <button className="btn-submit" type="submit">Cập nhật</button>
                            </form>
                        </div> */}
                    </div>
                    
                )}

            </Formik>
        </div>
    )
}

export default Feedback

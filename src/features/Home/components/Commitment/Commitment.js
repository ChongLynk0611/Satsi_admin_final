import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import AddIcon from '@material-ui/icons/Add';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './Commitment.css';

import CommitmentApi from 'api/CommitmentApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';
import updateData from 'hooks/updateData';

function Commitment() {
    const [commitment, setCommitment] = useState();
    const [reload, setReload] = useState(true);
    const [initaValues, setInitaValues] = useState({id:"",Image:null,Title:"",Content:"",Status:""});

    const validationSchema = yup.object().shape({
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải'),
        Title: yup.string().required('Hãy nhập tiêu đề '),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(CommitmentApi.getCommitment, setCommitment);
    },[]);
    
    const deleteHanlde = (id) => {
        return () => {
            deleteData(CommitmentApi.deleteCommitment, setCommitment, id);
        }
    }

    const chooseCommitment = (item, values) => {
        return () => {
            values.id = item.id;
            values.Title = item.Title;
            values.Content = item.Content;
            values.Image = item.Image;
            setInitaValues(item);
        }
    }

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Content", values.Content);
        data.append("Image", values.Image);
        console.log(data);
        // Trường hợp thêm mới
        if(values.id === ""){
            postData(CommitmentApi.postCommitment, setCommitment, data);
        }else{
            // Trường hợp cập nhật
            updateData(CommitmentApi.updateCommitment, setCommitment, data, values.id);
        }
        values.id = "";
        values.Title = "";
        values.Content = "";
        values.Image = null;
    }

    const Addhanlde = (values) => {
        return () => {
            values.id = "";
            values.Title = "";
            values.Content = "";
            values.Image = null;
            setReload(!reload);
        }
    }

    return (
        <div className="Commitment">
            <Formik
                initialValues={initaValues}
                validationSchema = {validationSchema}
                onSubmit = {handleSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <div>
                        <p className="C-title">Cam kết</p>
                        <div className="btn_Them" onClick={Addhanlde(values)}>
                            <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                            <span>Thêm mới</span>
                        </div>
                        <div className="C-body">
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Nội dung</th>
                                    <th>Xóa</th>
                                    <th>Sửa</th>
                                </tr>
                            </table>
                            {commitment && 
                                commitment.map((item, index) => (
                                    <tr>
                                        <td>{item.Title}</td>
                                        <td>{parse(item.Content)}</td>
                                        <td className="C-icon" onClick={deleteHanlde(item.id)} title="Xóa cam kết"><DeleteIcon /></td>
                                        <td className="C-icon" onClick={chooseCommitment(item, values)} title="Sửa cam kết"><EditIcon /></td>
                                    </tr>   
                                ))

                            }
                        </div>
                        <div className="C-curent">
                            <p className="C-title">Chi tiết cam kết</p>
                            <form onSubmit={handleSubmit} className="ImageSubmit">
                                <p className="C-subTitle">Tiêu đề:</p>
                                <input 
                                    name="Title"
                                    value={values.Title}
                                    onChange={handleChange}
                                    className="Input-commitment"
                                />
                                {errors["Title"] && <p className="error">{errors["Title"]}</p>}
                                <p className="C-subTitle">Nội dung:</p>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={values.Content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        values.Content = data;
                                    }}
                                    name="Content"
                                />
                                {errors["Content"] && <p className="error">{errors["Content"]}</p>}
                                <p className="C-subTitle">Ảnh nền: </p>
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
                        </div>
                    </div>
                    
                )}

            </Formik>
        </div>
        
    )
}

export default Commitment

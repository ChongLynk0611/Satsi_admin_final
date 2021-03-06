import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import * as yup from 'yup';

import Thumb from 'components/Thumb/Thumb';

import './Pretige.css';

import PretigeApi from 'api/PretigeApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';
import updateData from 'hooks/updateData';

function Pretige() {
    const [reload, setReload ] = useState(true);
    const [pretiges, setPretiges] = useState();
    const initialValues = {id:"",Title:"", Image:null, Content:""};
    const validationSchema = yup.object().shape({
        Image: yup.mixed().required('Hãy chọn file trước khi đăng tải'),
        Title: yup.string().required('Hãy nhập tiêu đề '),
        Content: yup.string().required('Hãy nhập nội dung')
    })

    useEffect(() => {
        fetchData.fetchData(PretigeApi.getPretige, setPretiges);
    },[]);

    const deleteHanlde = (id) => {
        return () => {
            deleteData(PretigeApi.deletePretige, setPretiges, id);
        }
    }

    const choosePretige = (item, values) => {
        return () => {
            values.id = item.id;
            values.Title = item.Title;
            values.Image = item.Image;
            values.Content = item.Content;
            setReload(!reload);
            console.log(item);
         }
    }

    const handleSubmit = (values) => {
        let data = new FormData();
        data.append("Title", values.Title);
        data.append("Content", values.Content);
        data.append("Image", values.Image);
        // Trường hợp thêm mới 
        if(values.id === ""){
            postData(PretigeApi.postpretige, setPretiges, data);
        }else{
            // Trường hợp câp nhật
            updateData(PretigeApi.updatePretige, setPretiges, data, values.id);
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
        <div className="Pretige">
            <Formik
                initialValues={initialValues}
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
                }) => (
                    <div>
                        <p className="P-title">Uy tín</p>
                        <div className="P-body">
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Xóa</th>
                                    <th>Sửa</th>
                                </tr>
                            </table>
                            {pretiges && 
                                pretiges.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Title}</td>
                                        <td className="P-icon" onClick={deleteHanlde(item.id)} title="Xóa cam kết"><DeleteIcon /></td>
                                        <td className="P-icon" onClick={choosePretige(item, values)} title="Sửa cam kết"><EditIcon /></td>
                                    </tr>   
                                ))
                            }
                        </div>
                        <div className="P-curent">
                            <p className="P-title">Chi tiết uy tín</p>
                            <form onSubmit={handleSubmit} className="ImageSubmit">
                                <div className="btn_Them" onClick={Addhanlde(values)}>
                                    <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                                    <span>Thêm mới</span>
                                </div>
                                <p className="P-subTitle">Tiêu đề:</p>
                                <input 
                                    name="Title"
                                    value={values.Title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="Input-pretige"
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
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    // onBlur={ handleBlur }
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
                                <button className="btn-submit" type="submit">{ values.id ? "Cập nhật" : "Tạo"}</button>
                            </form>
                        </div>
                    </div>
                    
                )}

            </Formik>
        </div>
    )
}

export default Pretige

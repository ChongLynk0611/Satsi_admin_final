import React, {useState, useEffect} from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as Yup from 'yup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import './AddCategories.css';

import CategoryApi from '../../../../api/CategoryApi';

class Thumb extends React.Component {
    state = {
      loading: false,
      thumb: undefined,
    };
  
    componentWillReceiveProps(nextProps) {
      if (!nextProps.file) { return; }
  
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(nextProps.file);
      });
    }
  
    render() {
      const { file } = this.props;
      const { loading, thumb } = this.state;
  
      if (!file) { return null; }
  
      if (loading) { return <p>loading...</p>; }
  
      return (<img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={400}
        width={600} />);
    }
}
  
function AddCategories(props) {
    const [content, setContent] = useState();
    const [detail, setDetail] = useState();
    const [submenu, setSubmenu] = useState();

    const initValues = {
        CategoryName:'',
        Detail:'',
        subMenuId:'',
        Image:null,
        Content:''
    }

    useEffect(() => {
        // call api submenu về và setMenu
        const getSubmenu = async () => {
            try {
                const response = await CategoryApi.getSubmenu();
                setSubmenu(response);
                
            } catch (error) {
                console.log("failed fetch submenu: ", error);
            }
        }

        getSubmenu();
    }, []);

    const handleSubmit = (values) => {
        const postCategory = async (values) => {
            try {
                const response = await CategoryApi.postCategory(values);
                console.log(response);
            } catch (error) {
                console.log("failed post category: ", error);
            }
        }
        let data = new FormData();
        data.append("CategoryName", values.CategoryName);
        data.append("Detail", values.Detail);
        data.append("subMenuId", values.subMenuId);
        data.append("Image", values.Image);
        data.append("Content", values.Content);

        postCategory(data);
    }

    return (
        <div className="AdminPage">
            <div className="Admin-body">
                <h2>Nội dung tuyển dụng</h2>
                <Formik
                    initialValues={initValues}
                    onSubmit = {handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="formSubmit">
                            <InputLabel id="handle" style={{fontSize:"16px"}}>Hình thức tuyển</InputLabel>
                            {   submenu && <Select
                                    labelId="handle"
                                    id="handle"
                                    value={values.subMenuId}
                                    name="subMenuId"
                                    onChange={handleChange}
                                    style={{fontSize:"16px", width:"20%", margin:"10px 0"}}
                                >
                                    {
                                        submenu.map((item, index) => (
                                            <MenuItem value={item.id} key={index}>{item.Title}</MenuItem>
                                        ))
                                    }
                                </Select>
                            }   
                            <p className="CategoryName">Ngành nghề :</p>
                            <input 
                                name="CategoryName"
                                value={values.CategoryName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="Input-category"
                            />
                            <p>Nội dung:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                    values.Content = data;
                                }}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                // onBlur={ handleBlur }
                                name="Content"
                            />
                            <p>Chi tiết:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={detail}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDetail(data);
                                    values.Detail = data;
                                }}
                                // onBlur={ handleBlur }
                                name="Detail"
                            />
                            <p>Ảnh nền: </p>
                            <input 
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("Image", event.target.files[0]);
                                }}
                                name="Image"
                            />
                            <Thumb file={values.Image} />
                            <button className="btn-submit" type="submit">Đăng tải</button>
                        </form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default AddCategories;


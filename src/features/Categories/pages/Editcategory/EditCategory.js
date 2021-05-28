import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './EditCategory.css';

import CategoryApi from 'api/CategoryApi';

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

function EditCategory() {
    const {id} = useParams();
    const [initialValues, setInitialValues] = useState();

    useEffect(() =>{
        // Lấy category về theo id
        const getCategory = async (id) => {
            try {
                const response = await CategoryApi.getCategory(id);
                console.log(response);
                setInitialValues({
                    CategoryName:response.CategoryName,
                    Content:response.Content,
                    Detail: response.Detail,
                    Image: response.Image
                });
            } catch (error) {
                console.log("failed get category: ",error);
            }
        }
        getCategory(id);
    },[]);

    const handleSubmit = (values) => {
        const updateCategory = async (values) => {
            try {
                const response = await CategoryApi.updateCategory(id, values);
                console.log(response);
            } catch (error) {
                console.log("failed upate category: ", error);
            }
        }

        let data = new FormData();
        data.append("CategoryName", values.CategoryName);
        data.append("Detail", values.Detail);
        data.append("subMenuId", values.subMenuId);
        data.append("Image", values.Image);
        data.append("Content", values.Content);

        updateCategory(data);
    }

    return (
        <div className="EditCategory">
            <p className="EC-title">Cập nhật bài đăng</p>
            {initialValues && 
                <Formik
                    initialValues={initialValues}
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
                            <p>Chi tiết:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.Detail}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
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
                            {
                                typeof(values.Image) === 'string' ? <img src={`${process.env.REACT_APP_API_URL}/${values.Image}`}/>:(
                                    <Thumb file={values.Image} />
                                )
                            }
                            <button className="btn-submit" type="submit">Cập nhật</button>
                        </form>
                    )}

                </Formik>
            }      
        </div>
    )
}

export default EditCategory;


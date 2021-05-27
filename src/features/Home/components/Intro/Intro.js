import React,{useState, useEffect} from 'react'
import { Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './Intro.css';

import IntroApi from 'api/IntroApi';
import updateData from 'hooks/updateData';

function Intro() {
    const [initValues, setInitValues] = useState();
    useEffect(() =>{
        // Lấy category về theo id
        const getIntro = async () => {
            try {
                const response = await IntroApi.getIntro();
                console.log(response);
                setInitValues({
                    id: response[0].id,
                    Title:response[0].Title,
                    SubTitle:response[0].SubTitle,
                    Description: response[0].Description,
                    LinkVideo: response[0].LinkVideo,
                    Content: response[0].Content
                });
            } catch (error) {
                console.log("failed get category: ",error);
            }
        }
        getIntro();
    },[]);

    const handleSubmit = (values) => {
        updateData(IntroApi.updateIntro, setInitValues, values, values.id);
    }

    return (
        <div className="Intro">
            <p className="I-title">Giới thiệu</p>
            {initValues && 
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
                            <p>Tiêu đề:</p>
                            <input 
                                name="Title"
                                value={values.Title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="I-Input"
                            />
                            <p>Tiêu đề phụ:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.SubTitle}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.SubTitle = data;
                                }}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                // onBlur={ handleBlur }
                                name="SubTitle"
                            />
                            <p>Mô tả:</p>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.Description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    values.Description = data;
                                }}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                // onBlur={ handleBlur }
                                name="Description"
                            />
                            <p>Nội dung:</p>
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
                            <p>Link video:</p>
                            <input 
                                name="LinkVideo"
                                value={values.LinkVideo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="I-Input"
                            />
                            <button className="btn-submit" type="submit">Cập nhật</button>
                        </form>
                    )}

                </Formik>
            }      
        </div>
    )
}

export default Intro

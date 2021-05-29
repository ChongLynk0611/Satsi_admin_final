import React from 'react'
import { Formik} from 'formik';

import Editor from '../../components/Editor/Editor';

import './AddNews.css';

function AddNews() {

    const onSubmit = (values) => {
        
    }
    
    return (
        <div className="AddNews">
            <p>Thêm tin tức</p>
            <Formik 
                initialValues={{ News: '' }}
                onSubmit = {onSubmit}
            >
                {({
                    values,
                    handleSubmit,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Editor
                            values = {values.News}
                            name = "News"
                            onChange = {v => setFieldValue('News', v)}

                        />
                        <button className="btn-submit" type="submit">Đăng bài</button>
                    </form>
                )}
                
            </Formik>
        </div>  
    )
}

export default AddNews

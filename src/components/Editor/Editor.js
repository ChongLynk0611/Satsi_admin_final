import React,{useState} from 'react';
import ReactQuill from 'react-quill';
import './Editor.css';

function Editor(props) {

    return (
        <div className="Editor">
            <ReactQuill  
                {...props}
                modules = {Editor.modules}
                formats = {Editor.formats}
                placeholder = "Soạn thảo tin tức tại đây..."
            />
        </div>
    )
}

Editor.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'},{'header': [3,4,5,6]}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ]
}

Editor.formats = [
'header', 'font', 'size',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image', 'video'
]

export default Editor

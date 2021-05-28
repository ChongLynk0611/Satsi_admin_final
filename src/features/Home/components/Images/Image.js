import React,{useState, useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

import './Images.css';

import ImageApi from 'api/ImageApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';
import postData from 'hooks/postData';

function Image() {
    const [images, setImages] = useState();

    useEffect(() => {
        fetchData(ImageApi.getImages, setImages);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(ImageApi.deleteImage, setImages, id);
        }
    }

    return (
        <div className="Images">
            <p className="I-title">Danh sách hình ảnh</p>
            <div className="I-body">
                {images && images.map((image, index) => (
                    <div className="I-image" key={index}>
                        <img src={`${process.env.REACT_APP_API_URL}/${image.ImageUrl}`}/>
                        <div 
                            className="btn_delete" 
                            title="Xóa  hình ảnh"
                            onClick={deleteHandle(image.id)}
                        ><DeleteIcon /></div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Image

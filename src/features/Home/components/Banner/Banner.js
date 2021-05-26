import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik } from 'formik';

import Thumb from 'components/Thumb/Thumb';

import './Banner.css';

import BannerApi from 'api/BannerApi';

function Banner() {
    const [images, setImages] = useState();
    const initValues = {
        Image:""
    }

    useEffect(() => {
        const getBanners = async () => {
            try {
                const response = await BannerApi.getBanner();
                console.log(response);
                setImages(response);
            } catch (error) {
                console.log("failed get banners: ", error);
            }
        }

        getBanners();
    },[]);

    const deleteHandle = (id) => {
        return () => {
            const deleteBanner = async () => {
                try {
                    const response = await BannerApi.deleteBanner(id);
                    console.log(response, id);
                    const new_Banners = images.filter(image => id !== image.id);
                    setImages(new_Banners);
                } catch (error) {
                    console.log("failed delete banner : ", error);
                }
            }
            deleteBanner();
        }
    }

    const hanldeSubmit = (values) => {
        const createBanner = async (values) => {
            try {
                const response = await BannerApi.postBanner(values);
                console.log(response.listBanner.data);
                setImages(response.listBanner.data);
            } catch (error) {
                console.log("failed post banner : ", error);
            }
        }

        let data = new FormData();
        data.append("Image", values.Image);

        createBanner(data);
    }

    return (
        <div className="Banner">
            <p className="B-title"> Danh sách banners</p>
            <div className="B-body">
                {images && images.map((image, index) => (
                    <div className="BannerItem" key={index}>
                        <img src={`${process.env.REACT_APP_API_URL}/${image.BannerImgUrl}`}/>
                        <div 
                            className="btn_delete" 
                            title="Xóa banner"
                            onClick={deleteHandle(image.id)}
                        ><DeleteIcon /></div>
                    </div>
                ))}
            </div>
            <div className="add-banner">
                <p>Thêm ảnh banner :</p>
                <Formik
                    initialValues={initValues}
                    onSubmit = {hanldeSubmit}
                >
                    {({
                        values,
                        handleSubmit,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="ImageSubmit">
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

export default Banner

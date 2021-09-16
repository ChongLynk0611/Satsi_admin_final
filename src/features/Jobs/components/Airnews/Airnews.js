import React,{useState, useEffect}  from 'react'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './Airnews.css';

import  AirnewsApi from 'api/AirnewsApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';

function Airnews() {
    const [airnews, setAirnews] = useState();

    useEffect(() => {
        fetchData.fetchData(AirnewsApi.getAirnewsApi, setAirnews);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(AirnewsApi.deleteAirNews, setAirnews, id);
        }
    }

    return (
        <div className="Airnews">
            <p className="AN-title">Danh sách tin tức ngành hàng không</p>
            <Link className="btn_Them" to="/HocNgheKhoiNghiep/Them">
                <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                <span>Thêm mới</span>
            </Link>
            <div className="AN-body">
                <table>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Tiêu đề phụ</th>
                        <th>Xóa</th>
                        <th>Sửa</th>
                    </tr>
                </table>
                {airnews && 
                    airnews.map((item, index) => (
                        <tr>
                            <td>{item.Title}</td>
                            <td>{item.SubContent}</td>
                            <td className="AN-icon" onClick={deleteHandle(item.id)} title="Xóa bài đăng"><DeleteIcon /></td>
                            <td className="AN-icon" title="Sửa tin tức">
                                <Link 
                                    to={`/HocNgheKhoiNghiep/Sua/${item.id}`}
                                    style={{color:"#000"}}
                                ><EditIcon /></Link>
                            </td>
                        </tr>    
                    ))
                }
            </div>
        </div>
    )
}

export default Airnews;

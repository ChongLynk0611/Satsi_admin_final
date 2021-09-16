import React,{useState, useEffect}  from 'react'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './NewsPage.css';

import NewsApi from 'api/NewsApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';

function NewsPage() {
    const [news, setNews] = useState();

    useEffect(() => {
        fetchData.fetchData(NewsApi.getNews, setNews);
    },[]);

    const deleteHandle = (id) => {
        return () => {
            deleteData(NewsApi.deleteNews, setNews, id);
        }
    }

    return (
        <div className="NewsPage">
            <p className="N-title">Danh sách tin tức</p>
            <Link className="btn_Them" to="/TinTuc/Them">
                <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                <span>Thêm mới</span>
            </Link>
            <div className="N-body">
                <table>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Tiêu đề phụ</th>
                        <th>Xóa</th>
                        <th>Sửa</th>
                    </tr>
                </table>
                {news && 
                    news.map((item, index) => (
                        <tr>
                            <td>{item.Title}</td>
                            <td className="N-detail">{item.SubContent}</td>
                            <td className="N-icon" onClick={deleteHandle(item.id)} title="Xóa bài đăng"><DeleteIcon /></td>
                            <td className="N-icon" title="Sửa tin tức">
                                <Link 
                                    to={`/TinTuc/Sua/${item.id}`}
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

export default NewsPage;

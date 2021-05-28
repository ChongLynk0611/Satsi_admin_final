import React,{useState, useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './ListCategories.css';

import CategoryApi from 'api/CategoryApi';
import fetchData from 'hooks/fetchData';
import deleteData from 'hooks/deleteData';

function ListCategories() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetchData(CategoryApi.getCategories, setCategories);
    },[])
 
    const deleteHandle = (id) => {
        return () => {
            deleteData(CategoryApi.deleteCategory, setCategories, id);
        }  
    }

    return (
        <div className="ListCategories">
            <p className="LC-title">Danh sách bài đăng</p>
            <a className="btn_Them" href="/DangBai/Them">
                <AddIcon style={{fontSize:"18px", marginRight:"3px"}}/>
                <span>Thêm mới</span>
            </a>
            <div className="LC-body">
                <table>
                    <tr>
                        <th>Tên</th>
                        <th>Chi tiết</th>
                        <th>Xóa</th>
                        <th>Sửa</th>
                    </tr>
                </table>
                {categories && 
                    categories.map((category, index) => (
                        // <Category category={category} key={index} />
                        <tr>
                            <td>{category.Title}</td>
                            <td className="LC-detail">{parse(category.Detail)}</td>
                            <td className="LC-icon" onClick={deleteHandle(category.id)} title="Xóa bài đăng"><DeleteIcon /></td>
                            <td className="LC-icon" title="Sửa bài đăng">
                                <Link 
                                    to={`/DangBai/Sua/${category.id}`}
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

export default ListCategories;
import React,{useState, useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import './ListCategories.css';

import CategoryApi from 'api/CategoryApi';


function ListCategories() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        // Lấy về danh sách tất cả danh mục 
        const getCategories = async () => {
            try {
                const response = await CategoryApi.getCategories();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.log("failed fetch Categories: ",error);
            }
        }

        getCategories();
    },[])
 
    const deleteHandle = (id) => {
        return () => {
            const deleteCategory = async () => {
                try {
                    const response = await CategoryApi.deleteCategory(id);
                    console.log(response);
                    const new_categories  = categories.filter( category => category.id != id) ;
                    setCategories(new_categories);

                } catch (error) {
                    console.log("failed delete Category: ", error);
                }
            }
            deleteCategory();
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
                        <th>Xóa</th>
                        <th>Sửa</th>
                    </tr>
                </table>
                {categories && 
                    categories.map((category, index) => (
                        // <Category category={category} key={index} />
                        <tr>
                            <td>{category.CategoryName}</td>
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
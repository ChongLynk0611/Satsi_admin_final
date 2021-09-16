import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListCollaborators.css';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';

// import { companiesApi } from 'api/CompaniesApi';
// import fetchData from 'hooks/fetchData';
// import deleteData from 'hooks/deleteData';

function ListCollaborators() {
  const [collaborators, setCollaborators] = useState();
  const [page, setPage] = useState(1);
  const [amountOfCollaborators, setAmountOfCollaborators] = useState();
  const [amountOfPages, setAmountOfPages] = useState();

  const [isDeleting, setIsDeleting] = useState(false);
  let size = 3;

  useEffect(() => {
    const params = {
      page,
      size,
    };
    const stringParams = queryString.stringify(params);
    
    const fetch = async () => {
      const res = await axios.get(
        `http://206.189.90.147:5001/company?${stringParams}`
      );
      console.log(res);

      setAmountOfCollaborators(res.headers['content-range']);
      
      setAmountOfPages(Math.ceil(res.headers['content-range'] / size));

      setCollaborators(res.data);
      if (res.data.length === 0) {
        setPage(page - 1);
      }
    };
    fetch();
  }, [page, isDeleting]);

  console.log(collaborators);
  console.log(amountOfCollaborators);
  console.log(amountOfPages);

  const deleteHandle = async (id) => {
    setIsDeleting(true);
    const res = await axios.delete(`http://206.189.90.147:5001/company/${id}`);
    console.log(res, id);
    const restCollaborators = collaborators.filter((item) => item.id !== id);
    setCollaborators(restCollaborators);
    setIsDeleting(false);
  };
  const handleChangePage = (e, value) => {
    setPage(value);
  };
  return (
    <div className='ListCollaborators'>
      <p className='LC-title'>Danh sách cộng tác viên</p>
      <Link className='btn_Them' to='/collaborators/Them'>
        <AddIcon style={{ fontSize: '18px', marginRight: '3px' }} />
        <span>Thêm mới</span>
      </Link>
      <div className='LCo-body'>
        <table>
          <tr>
            <th>Mã cộng tác viên</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Xóa</th>
            <th>Sửa</th>
          </tr>
          {collaborators !== undefined &&
            collaborators.map((item) => (
              <tr key={item.id}>
                <td>{item.CodeCompany}</td>
                <td className='LC-detail'>{item.Name}</td>
                <td className='LC-detail'>{item.Adress}</td>

                <td
                  className='LC-icon'
                  // onClick={deleteHandle(category.id)}
                  title='Xóa bài đăng'
                >
                  <div onClick={deleteHandle.bind(this, item.id)}>
                    <DeleteIcon />
                  </div>
                </td>
                <td className='LC-icon' title='Sửa bài đăng'>
                  <Link
                    to={`/Collaborators/Sua/${item.id}`}
                    style={{ color: '#000' }}
                  >
                    <EditIcon />
                  </Link>
                </td>
              </tr>
            ))}
        </table>
        <div className='pagination'>
          <Pagination count={amountOfPages} onChange={handleChangePage} />
        </div>
      </div>
    </div>
  );
}

export default ListCollaborators;

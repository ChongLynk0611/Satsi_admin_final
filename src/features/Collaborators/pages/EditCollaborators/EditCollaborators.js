import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';

import * as yup from 'yup';

import './EditCollaborators.css';
import axios from 'axios';

function EditCollaborators() {
  const [companyCode, setCompanyCode] = useState();

  let history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const getCompanyById = async () => {
      const res = await axios.get(`http://206.189.90.147:5001/company/${id}`);
      setCompanyCode({
        CodeCompany: res.data.CodeCompany,
        Address: res.data.Adress,
        Name: res.data.Name,
      });
      console.log(res.data);
    };
    getCompanyById();
  }, []);
  // console.log(companyCode);

  const validationSchema = yup.object().shape({
    CodeCompany: yup.string().required('Hãy nhập tiêu đề '),
    Name: yup.string().required('Hãy nhập tiêu đề phụ'),
    Address: yup.string().required('Hãy nhập tiêu đề phụ'),
  });

  const onSubmit = (values) => {
    // let data = new FormData();
    // data.append('companyCode', values.companyCode);
    // data.append('address', values.address);
    // data.append('name', values.name);
    //   postData(NewsApi.postNews, setTemp, data);
    //   setTimeout(() => {
    //     history.push('/TinTuc');
    //   }, 2500);
    const editData = async () => {
      const res = await axios.put(
        `http://206.189.90.147:5001/company/${id}`,
        values
      );
      console.log(res);
    };
    editData();
    console.log(values);
    setTimeout(() => history.push('/Collaborators'), 1000);
  };

  return (
    <div className='EditCollaborators'>
      <p className='N-title'>Sửa thông tin</p>
      {companyCode && (
        <Formik
          initialValues={companyCode}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='FormNews'>
              <p className='N-text'>Mã cộng tác viên</p>
              <input
                name='CodeCompany'
                value={values.CodeCompany}
                onChange={handleChange}
                onBlur={handleBlur}
                className='Input-News'
              />
              {errors['companyCode'] && (
                <p className='error'>{errors['companyCode']}</p>
              )}
              <p className='N-text'>Tên</p>
              <input
                name='Name'
                value={values.Name}
                onChange={handleChange}
                onBlur={handleBlur}
                className='Input-News'
              />
              {errors['name'] && <p className='error'>{errors['name']}</p>}
              <p className='N-text'>Địa chỉ</p>
              <input
                name='Address'
                value={values.Address}
                onChange={handleChange}
                onBlur={handleBlur}
                className='Input-News'
              />
              {errors['address'] && (
                <p className='error'>{errors['address']}</p>
              )}

              <button className='btn-submit' type='submit'>
                Cập nhật
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default EditCollaborators;

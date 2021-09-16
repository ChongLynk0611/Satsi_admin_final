import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import './AddCollaborators.css';

function AddCollaborators() {
  let history = useHistory();
  const initValues = { CodeCompany: '', Address: '', Name: '' };
  const validationSchema = yup.object().shape({
    CodeCompany: yup.string().required('Hãy nhập tiêu đề '),
    Address: yup.string().required('Hãy nhập tiêu đề phụ'),
    Name: yup.string().required('Hãy nhập tiêu đề phụ'),
  });

  const onSubmit = async (values) => {
    // let data = new FormData();
    // data.append('companyCode', values.companyCode);
    // data.append('address', values.address);
    // data.append('name', values.name);
    //   postData(NewsApi.postNews, setTemp, data);
    //   setTimeout(() => {
    //     history.push('/TinTuc');
    //   }, 2500);
    console.log(values);

    const res = await axios.post('http://206.189.90.147:5001/company', values);
    console.log(res);

    console.log('haha');

    history.push('/Collaborators');
  };

  return (
    <div className='AddCollaborators'>
      <p className='N-title'>Thêm cộng tác viên</p>
      <Formik
        initialValues={initValues}
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
          <form onSubmit={handleSubmit} className='FormCollaborators'>
            <p className='N-text'>Mã cộng tác viên:</p>
            <input
              name='CodeCompany'
              value={values.CodeCompany}
              onChange={handleChange}
              onBlur={handleBlur}
              className='Input-Collaborators'
            />
            {errors['CodeCompany'] && (
              <p className='error'>{errors['CodeCompany']}</p>
            )}
            <p className='N-text'>Tên</p>
            <input
              name='Name'
              value={values.Name}
              onChange={handleChange}
              onBlur={handleBlur}
              className='Input-Collaborators'
            />
            {errors['Name'] && <p className='error'>{errors['Name']}</p>}
            <p className='N-text'>Địa chỉ</p>
            <input
              name='Address'
              value={values.Address}
              onChange={handleChange}
              onBlur={handleBlur}
              className='Input-Collaborators'
            />
            {errors['Address'] && <p className='error'>{errors['Address']}</p>}

            <button className='btn-submit' type='submit'>
              Đăng tải
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddCollaborators;

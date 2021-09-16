import { FormGroup } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';

import './index.css'

const LoginPage = (props) => {
    const history = useHistory();
    if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'));
        history.push('/');
    }

    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [pendding, setPendding] = useState(false);
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setPendding(true);
        const inforCustomer = {Username: username, Password: password};

        fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(inforCustomer)
        }).then(res => {
            if(!res.ok){
                throw Error('dang nhap that bai')
            }
            return res.json()
        }).then(data => {
            setPendding(false)
            setUsername('');
            setPassword('');

            localStorage.setItem('token', data.acesstoken);
            const { from } = props.location.state || { from: { pathname: "/" } };
            history.push(from);
        }).catch(e => {
            console.log(e);
            setPendding(false)
            setUsername('');
            setPassword('');
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        })
    }
    return (  
        <div className="Login-container" onSubmit={(e) => handleSubmit(e)}>
            {error ? <div className="error_popup">sai tên tài khoản hoặc mật khẩu</div> : <></> }
            <form className='form_submit'>
                <div className="form_group">
                    <p className="label">tên tài khoản: </p>
                    <input 
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="Input"
                        required
                        />
                </div>
                <div className="form_group">
                    <p className="label">mật khẩu: </p>
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="Input"
                        required
                        />
                </div>
                <div className="form_group">
                    {pendding ? 
                    <button className="btn-submit" type="submit" disabled>Đang đăng nhập...</button> :
                    <button className="btn-submit" type="submit">Đăng nhập</button>
                }
                </div>
            </form>
        </div>
    );
}
 
export default LoginPage;
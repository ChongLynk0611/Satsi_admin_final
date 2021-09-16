import React, {useEffect} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const history = useHistory()
    useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions)
        .then(response =>{
          if(!response.ok){
            localStorage.removeItem('token');
            history.push('/login')
          }
          response.text()
        })
        .catch(error => console.log('error', error));
    }, []);

    
    return (
        <Route {...rest} render={props => {
            const currentUser = localStorage.getItem('token');
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            
            // authorised so return component
            return <Component {...props} />
        }} />
    )
}
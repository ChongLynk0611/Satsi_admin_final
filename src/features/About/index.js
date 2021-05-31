import React from 'react';
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';

import AboutPage from './pages/AboutPage/AboutPage';

function About (props){
    const match = useRouteMatch();
    const history = useHistory();

    if(!localStorage.getItem('token')){
        console.log(localStorage.getItem('token'));
        history.push('/Login');
    }
    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={AboutPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default About;
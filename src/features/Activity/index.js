import React from 'react';
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';

import ActivityPage from './pages/ActivityPage/ActivityPage';

function  Activity(props){
    const match = useRouteMatch();
    const history = useHistory();

    if(!localStorage.getItem('token')){
        console.log(localStorage.getItem('token'));
        history.push('/Login');
    }
    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={ActivityPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default Activity;
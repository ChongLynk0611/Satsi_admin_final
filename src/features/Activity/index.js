import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import ActivityPage from './pages/ActivityPage/ActivityPage';

function  Activity(props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={ActivityPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default Activity;
import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import EducationPage from './pages/EducationPage/EducationPage';

function Education (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={EducationPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default Education;
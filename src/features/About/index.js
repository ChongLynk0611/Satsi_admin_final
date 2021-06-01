import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import AboutPage from './pages/AboutPage/AboutPage';

function About (){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={AboutPage}/>
            </Switch>
        </React.Fragment>
    )
}

export default About;
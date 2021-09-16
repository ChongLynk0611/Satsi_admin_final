import React from 'react';
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom';

// import HomePage from './pages/HomePage/HomePage';
import NewsPage from './pages/NewsPage/NewsPage';
import AddNews from './pages/AddNews/AddNews';
import EditNews from './pages/EditNews/EditNews';

function News (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={NewsPage}/>
                <Route path={`${match.url}/Them`} component={AddNews}/>
                <Route path={`${match.url}/Sua/:id`} component={EditNews}/>
            </Switch>
        </React.Fragment>
    )
}

export default News;
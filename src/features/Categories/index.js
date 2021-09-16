import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import ListCategories from './pages/ListCategories/ListCategories';
import AddCategories from './pages/AddCategories/AddCategories';
import EditCategory from './pages/Editcategory/EditCategory';

function Categories (props){
    const match = useRouteMatch();

    return(
        <React.Fragment>
            <Switch>
                <Route exact path={match.url} component={ListCategories} />
                <Route path={`${match.url}/Them`} component={AddCategories} />
                <Route path={`${match.url}/Sua/:id`} component={EditCategory} />
            </Switch>
        </React.Fragment>
    )
}

export default Categories;
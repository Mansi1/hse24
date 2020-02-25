import {Container as MContainer} from "@material-ui/core";
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {HeaderComponent} from "./component/header-component";

import './app.css';
import CategoryListComponent from "./component/category-list-component";
import ProductListComponent from "./component/product-list-component";
import CategoryComponent from "./component/category-component";
import ProductComponent from "./component/product-component";
import {
    ROUTE_CATEGORY,
    ROUTE_CREATE_CATEGORY,
    ROUTE_CREATE_PRODUCT,
    ROUTE_EDIT_CATEGORY,
    ROUTE_PRODUCT,
    ROUTE_ROOT, ROUTE_SPECIFIC_CATEGORY, ROUTE_SPECIFIC_PRODUCT
} from "./routes";


export class App extends Component {


    render() {

        return (<Router>
                <MContainer>
                    <Route path={ROUTE_ROOT} component={HeaderComponent}/>
                    <Route exact path={[ROUTE_ROOT, ROUTE_CATEGORY]} render={(props) => <CategoryListComponent{...props} />}/>
                    <Route exact path={ROUTE_CREATE_CATEGORY} render={(props) => <CategoryComponent{...props}  update={false}/>} />
                    <Route exact path={ROUTE_EDIT_CATEGORY} render={(props) => <CategoryComponent{...props}  update={true}/>} />
                    <Route exact path={ROUTE_SPECIFIC_CATEGORY} render={(props) => <ProductListComponent{...props} />}/>

                    <Route exact path={ROUTE_PRODUCT} render={(props) => <ProductListComponent{...props} />}/>
                    <Route exact path={ROUTE_SPECIFIC_PRODUCT} render={(props) => <ProductComponent{...props}  update={true}/>} />
                    <Route exact path={ROUTE_CREATE_PRODUCT} render={(props) => <ProductComponent{...props}  update={false}/>} />
                </MContainer>
        </Router>
        );
    }
}


import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CategoryIcon from '@material-ui/icons/Category';
import ProductIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {RouteComponentProps} from 'react-router-dom'
import {ROUTE_CATEGORY, ROUTE_PRODUCT} from "../routes";

type HeaderState = {
    value: string
}

export class HeaderComponent extends React.Component<RouteComponentProps, HeaderState> {


    constructor(props: any) {
        super(props);
        this.state = {value: this.props.location.pathname || '/category'};
    }

    onChangeEvent(route: string) {
        this.setState({value: route});
        this.props.history.push(route)
    }

    render() {

        return (
            <BottomNavigation value={this.state.value} onChange={(evt, newValue) => {
                this.onChangeEvent(newValue)
            }}>
                <BottomNavigationAction label="Category" value={ROUTE_CATEGORY} icon={<CategoryIcon/>}/>
                <BottomNavigationAction label="Products" value={ROUTE_PRODUCT} icon={<ProductIcon/>}/>
            </BottomNavigation>
        );
    }

}

import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OnlineStoreClient, {CategoryResponseTDO} from "../client/online-store-client";
import {Link, RouteComponentProps} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ROUTE_CREATE_CATEGORY} from "../routes";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CategoryListComponent(props: RouteComponentProps) {

    useEffect(() => {
        fetchItems()
    }, []);

    const [items, setItems] = useState<Array<CategoryResponseTDO>>([]);

    const fetchItems = async () => {
        const categories = await new OnlineStoreClient().getAllCategoriesUsingGET({});
        if (Array.isArray(categories.body)) {
            const items: Array<CategoryResponseTDO> = categories.body;
            setItems(items);
        }
    };


    const classes = useStyles();

    return (
        <div style={{marginBottom: '5px', marginTop: '5px'}}>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {items.map(item =><Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Paper className={classes.paper} >
                            <Link to={'/category/' + item.id} style={{textDecoration: "none", color: 'grey'}}>
                                {item.name}
                            </Link>
                        </Paper>
                    </Grid>)}
                </Grid>
            </div>

            <Button color="primary" variant="contained" style={{marginTop: '5px'}}
                    onClick={() => {
                       props.history.push(ROUTE_CREATE_CATEGORY)
                    }}>Neue Category
            </Button>
        </div>
    );
}


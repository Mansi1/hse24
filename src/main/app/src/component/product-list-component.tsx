import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OnlineStoreClient, {ProductResponseTDO} from "../client/online-store-client";
import {Link} from "react-router-dom";
import {IProductListCompProps} from "../interface/i-product-list-comp-props";
import {Button} from "@material-ui/core";
import {ROUTE_CATEGORY, ROUTE_CREATE_PRODUCT} from "../routes";

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

export default function ProductListComponent(props: IProductListCompProps) {

    useEffect(() => {
        fetchItems()
    }, []);

    const [items, setItems] = useState<Array<ProductResponseTDO>>([]);
    const [title, setTitle] = useState<{ title: string, subtitle: string }>();

    const fetchItems = async () => {
        let products;
        if (props.match.params.categoryId) {
            products = await new OnlineStoreClient().getProductsByCategoryUsingGET({categoryId: parseInt(props.match.params.categoryId)});
            const category = await new OnlineStoreClient().getCategoryByIdUsingGET({id: parseInt(props.match.params.categoryId)});
            if (category.body) {
                setTitle({title: category.body.name || ' ', subtitle: category.body.description || ' '});
            }
        } else {
            setTitle({title: 'Alle Produkte', subtitle: ''});
            products = await new OnlineStoreClient().getAllProductsUsingGET({});

        }
        if (Array.isArray(products.body)) {
            const items: Array<ProductResponseTDO> = products.body;
            setItems(items);

        }
    };

    const classes = useStyles();

    const createNewProduct = () => {
        props.history.push(ROUTE_CREATE_PRODUCT);
    };

    const deleteCategory = async () => {
        await new OnlineStoreClient().deleteCategoryByIdUsingDELETE({id: parseInt(props.match.params.categoryId)});
        props.history.push(ROUTE_CATEGORY);
    };

    const getHeader = () => {
        return <div style={{textAlign: "center"}}>
            <h2>{title?.title}</h2>
            <h3>{title?.subtitle}</h3>
            {props.match.params.categoryId ?
                <div>
                    <Button color="primary" variant="contained" style={{marginBottom: '5px'}}
                            onClick={() => {
                                props.history.push(`/edit-category/${props.match.params.categoryId}`);
                            }}>Edit
                    </Button>
                    <Button color="secondary" variant="contained" style={{marginBottom: '5px', marginLeft: '5px'}}
                            onClick={() => {
                                deleteCategory();
                            }}>Löschen
                    </Button>
                </div> :
                <Button color="primary" variant="contained" style={{marginBottom: '5px'}}
                        onClick={() => {
                            createNewProduct();
                        }}>Neues Produkt
                </Button>}
        </div>
    };

    return (

        <div style={{marginBottom: '5px', marginTop: '5px'}}>
            {getHeader()}
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {items.map(item => <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Paper className={classes.paper}>
                            <Link to={'/product/' + item.id} style={{textDecoration: "none", color: 'grey'}}>
                                {item.name}
                            </Link>
                            <div style={{paddingTop: '10px'}}/>
                            <img src={item.image} style={{maxHeight: '250px'}}/>
                            <br/>
                            <div style={{fontWeight: 'bold', color: 'black'}}>{`${item.price} €`}</div>
                        </Paper>
                    </Grid>)}
                </Grid>
            </div>
        </div>
    );

}

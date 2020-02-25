import React from 'react';
import OnlineStoreClient, {
    CategoryResponseTDO,
    ProductRequestTDO,
    ProductResponseTDO
} from "../client/online-store-client";
import {Button, MenuItem, Paper, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import {IProductCompProps} from "../interface/i-product-comp-props";
import {IProductCompState, IProductCompStateCategory} from "../interface/i-product-comp-state";
import {CURRENCIES} from "../utils/currency";
import {ROUTE_CATEGORY} from "../routes";

const styles = () => ({
    FormControl: {
        marginTop: '5px'
    }
});

const INITIAL_STATE: IProductCompState = {
    update: true,
    name: '',
    description: '',
    image: '',
    price: 0,
    currency: 'EUR',
    category: '',
    categories: []
};

const currencies = CURRENCIES.map(c => {
    return {label: c, value: c}
});

export default withStyles(styles)(class extends React.Component<IProductCompProps, IProductCompState> {

    state = INITIAL_STATE;


    async componentDidMount() {
        //set prop if is create or update
        this.setState({update: this.props.update});
        await this.fetchData();
    }

    fetchData = async () => {
        if (this.props.match.params.productId) {
            const product = await new OnlineStoreClient().getProductByIdUsingGET({id: parseInt(this.props.match.params.productId)});
            if (product.body) {
                const item: ProductResponseTDO = product.body;
                //thx to the swagger tool
                if (item.name) {
                    this.setState({
                        name: item.name,
                    });
                }
                if (item.image) {
                    this.setState({
                        image: item.image,
                    });
                }
                if (item.price) {
                    this.setState({
                        price: item.price,
                    });
                }
                if (item.description) {
                    this.setState({
                        description: item.description
                    });
                }
                if (item.categoryId) {
                    this.setState({
                        category: item.categoryId + ''
                    });
                }
            }
        }
        const categories = await new OnlineStoreClient().getAllCategoriesUsingGET({});
        const responseTOS: Array<CategoryResponseTDO> | void = categories.body;
        if (responseTOS && Array.isArray(responseTOS)) {
            const categoriesMapped: Array<IProductCompStateCategory> = responseTOS.map((category: CategoryResponseTDO) => {
                return {id: category.id || -1, value: `${category.id || -1}`, label: category.name || ''}
            });
            if (categoriesMapped.length > 0) {
                this.setState({categories: categoriesMapped})
            }
        }
        this.setState({currency: 'EUR'});
    };

    constructor(props: IProductCompProps) {
        super(props);

    }


    async handleSubmit() {
        //TODO: doValidation
        let category = this.state.categories.find(c => this.state.category == c.value);
        if (category) {
            const product: ProductRequestTDO = {
                categoryId: category.id,
                name: this.state.name,
                image: this.state.image,
                price: this.state.price,
                description: this.state.description,
                currency: this.state.currency,
            };

            if (this.state.update) {
                await new OnlineStoreClient().updateProductUsingPUT({
                    product,
                    id: parseInt(this.props.match.params.productId)
                });
                await this.fetchData();
            } else {
                const result = await new OnlineStoreClient().addProductUsingPUT({
                    product
                });
                const response: ProductResponseTDO | void = result.body;
                if (response) {
                    this.props.history.push(`/product/${response.id}`);
                }
            }
        }
    }

    async handleDelete() {
        await new OnlineStoreClient().deleteProductByIdUsingDELETE({
            id: parseInt(this.props.match.params.productId)
        });
        this.props.history.push(ROUTE_CATEGORY);
    }

    public getDeleteButton() {
        if (this.state.update) {
            return <Button color="secondary" variant="contained" className={this.props.classes.FormControl}
                           style={{marginLeft: '5px'}}
                           onClick={() => {
                               this.handleDelete();
                           }}>Löschen</Button>
        }
    }

    render() {
        const {name, image, price, description, update, currency, category, categories} = this.state;
        const {classes} = this.props;

        return (
            <div style={{marginBottom: '5px', marginTop: '5px'}}>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper style={{textAlign: 'center', padding: '5px'}}>
                                <img src={image} style={{minHeight: "200px",maxHeight: '250px'}}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={9}>
                            <form>
                                <TextField
                                    label="Name"
                                    value={name}
                                    fullWidth={true}
                                    className={classes.FormControl}
                                    onChange={(evt) => this.setState(
                                        {name: evt.target.value}
                                    )}
                                />
                                <TextField
                                    label="Beschreibung"
                                    value={description}
                                    fullWidth={true}
                                    className={classes.FormControl}
                                    onChange={(evt) => this.setState(
                                        {description: evt.target.value}
                                    )}
                                />
                                <TextField
                                    label="Bild URL"
                                    value={image}
                                    fullWidth={true}
                                    className={classes.FormControl}
                                    style={{width: '50%'}}
                                    onChange={(evt) => this.setState(
                                        {image: evt.target.value}
                                    )}
                                />
                                <TextField
                                    select
                                    label="Category"
                                    value={category}
                                    className={classes.FormControl}
                                    style={{marginLeft: '5px', width: 'calc(50% - 5px)'}}
                                    onChange={(evt) => this.setState({category: evt.target.value})}
                                >
                                    {categories.map((option: IProductCompStateCategory) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Preis"
                                    value={price}
                                    required
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className={classes.FormControl}
                                    style={{width: '50%'}}
                                    onChange={(evt) => this.setState(
                                        {price: parseFloat(evt.target.value)}
                                    )}
                                />
                                <TextField
                                    select
                                    label="Währung"
                                    value={currency}
                                    className={classes.FormControl}
                                    style={{marginLeft: '5px', width: 'calc(50% - 5px)'}}
                                    onChange={(evt) => this.setState(
                                        {currency: evt.target.value}
                                    )}
                                >
                                    {currencies.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>


                                <Button color="primary" variant="contained" className={classes.FormControl}
                                        onClick={() => {
                                            this.handleSubmit()
                                        }}>{update ? 'Update' : 'Erstellen'}</Button>
                                {this.getDeleteButton()}
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }


})
import React from 'react';
import OnlineStoreClient, {CategoryRequestTDO, CategoryResponseTDO} from "../client/online-store-client";
import {Button, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import {ICategoryCompProp} from "../interface/i-category-comp-prop";
import {ICategoryCompState} from "../interface/i-category-comp-state";
import {ROUTE_CATEGORY} from "../routes";

const styles = () => ({
    FormControl: {
        marginTop: '5px'
    }
});

const INITIAL_STATE: ICategoryCompState = {
    update: true,
    name: '',
    description: ''
};

export default withStyles(styles)(class extends React.Component<ICategoryCompProp, ICategoryCompState> {

    state = INITIAL_STATE;


    async componentDidMount() {
        //set prop if is create or update
        this.setState({update: this.props.update});
        await this.fetchData();
    }

    fetchData = async () => {
        if (this.props.match.params.categoryId) {
            const category = await new OnlineStoreClient().getCategoryByIdUsingGET({id: parseInt(this.props.match.params.categoryId)});
            const response: CategoryResponseTDO | void = category.body;
            if (response) {
                if (response.description) {
                    this.setState({description: response.description});
                }
                if (response.name) {
                    this.setState({name: response.name});
                }
            }
        }

    };

    async handleSubmit() {
        //TODO: doValidation
        const category: CategoryRequestTDO = {
            name: this.state.name,
            description: this.state.description,
        };

        if (this.state.update) {
            await new OnlineStoreClient().updateCategoryUsingPUT({
                category,
                id: parseInt(this.props.match.params.categoryId)
            });
                this.props.history.push(`/category/${this.props.match.params.categoryId}`);
        } else {
            const result = await new OnlineStoreClient().addCategoryUsingPUT({
                category
            });
            const response: CategoryResponseTDO | void = result.body;
            if (response) {
                this.props.history.push(`/category/${response.id}`);
            }
        }

    }

    async handleDelete() {
        await new OnlineStoreClient().deleteCategoryByIdUsingDELETE({
            id: parseInt(this.props.match.params.categoryId)
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
        const {name, description, update} = this.state;
        const {classes} = this.props;

        return (
            <div style={{marginBottom: '5px', marginTop: '5px'}}>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
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
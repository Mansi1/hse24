import {RouteComponentProps} from "react-router-dom";
import {ClassKeyInferable, ClassKeyOfStyles, ClassNameMap} from "@material-ui/styles/withStyles/withStyles";

export interface IProductCompProps extends RouteComponentProps<{productId: string;}> {
    update: boolean;
    classes: ClassNameMap<ClassKeyOfStyles<ClassKeyInferable<any, any>>>
}
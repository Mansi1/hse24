import {RouteComponentProps} from "react-router-dom";
import {ClassKeyInferable, ClassKeyOfStyles, ClassNameMap} from "@material-ui/styles/withStyles/withStyles";

export interface ICategoryCompProp extends RouteComponentProps<{categoryId: string;}> {
    update: boolean;
    classes: ClassNameMap<ClassKeyOfStyles<ClassKeyInferable<any, any>>>
}
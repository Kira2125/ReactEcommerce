import {compose} from "redux";
import {connect} from "react-redux";
import {selectCollectionIsLoaded} from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/withSpinner/withSpinner.component";
import CategoryPage from "./collection.component";
import {createStructuredSelector} from "reselect";

const mapStateToProps =  createStructuredSelector({
    isLoading: state => !selectCollectionIsLoaded(state)
})

const ContainerCategoryPage = connect(mapStateToProps)(WithSpinner(CategoryPage));

export default ContainerCategoryPage;
import {compose} from "redux";
import {connect} from "react-redux";
import {selectFetching} from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/withSpinner/withSpinner.component";
import {createStructuredSelector} from "reselect";
import CollectionOverview from "./collection-overview.component";

const mapStateToProps =  createStructuredSelector({
    isFetching: selectFetching,
})

const ContainerOverviewPage = connect(mapStateToProps)(WithSpinner(CollectionOverview));

export default  ContainerOverviewPage;
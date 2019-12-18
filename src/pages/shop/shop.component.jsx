import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import ContainerOverviewPage from "../../components/collection-overiew/collection-overview.container";
import ContainerCategoryPage from "../collection/collection.container.component";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";


class ShopPage extends Component {

    componentDidMount() {
        const {fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
    }

    render() {
        let {match} = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={ContainerOverviewPage}/>
                <Route path={`${match.path}/:collectionId`} component={ContainerCategoryPage}/>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);

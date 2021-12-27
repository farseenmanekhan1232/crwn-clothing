import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import CollectionPage from './collection.component';

import WithSpinner from "../../../components/with-spinner/with-spinner.component";

import { selectIsCollectionsLoaded } from "../../../redux/shop/shop.selector";

const mapStateToProps=createStructuredSelector({
    isLoading:(state)=>!selectIsCollectionsLoaded(state)
})

export const CollectionPageContainer=compose(
    connect(mapStateToProps), 
    WithSpinner
)(CollectionPage);
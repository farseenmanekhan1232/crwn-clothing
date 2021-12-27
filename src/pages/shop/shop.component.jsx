import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';


import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import { CollectionOverviewContainer } from '../../components/collections-overview/collecitons-overview.container';

import {CollectionPageContainer} from '../../pages/shop/collection/collection.container';

class ShopPage extends React.Component
 {

  componentDidMount(){
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render(){
    return(
      <div className='shop-page '>
        <Route
          exact 
          path={`${this.props.match.path}`} 
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${this.props.match.path}/:collectionId`} 
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch =>({
  fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStart())
})

export default connect(null , mapDispatchToProps)(ShopPage);
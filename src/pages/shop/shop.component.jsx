import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import {firestore , convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

import CollectionsOverview from 
'../../components/collections-overview/collections-overview.component';
import CollectionPage from './collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';



const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component 
 {
   state={
     loading:true
   };

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const collectionRef = firestore.collection('collection');
    
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot=>{
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      this.props.updateCollection(collectionMap);
      this.setState({loading:false});
    });
  }

  render(){
    const loading =this.state.loading;
    return(
      <div className='shop-page '>
        <Route 
          exact 
          path={`${this.props.match.path}`} 
          render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}
        />
        <Route
          path={`${this.props.match.path}/:collectionId`} 
          render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>({
  updateCollection: collectionMap =>dispatch(updateCollections(collectionMap))
})

export default connect(null , mapDispatchToProps)(ShopPage);
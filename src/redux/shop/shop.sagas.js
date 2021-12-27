import {call , put, takeLatest} from 'redux-saga/effects';

import { firestore ,convertCollectionSnapshotToMap  } from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';

import ShopActionsTypes from './shop.types';

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = yield firestore.collection('collection');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap , snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }
    catch(error){
        yield put(fetchCollectionsFailure(error))
    }
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionsTypes.FETCH_COLLECTIONS_START , 
    fetchCollectionsAsync
    )
}
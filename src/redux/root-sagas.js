import {all , call} from 'redux-saga/effects';
import { onFetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';


export default function* rootSaga(){
    yield all([call(onFetchCollectionsStart) , call(userSagas)]);
    // "all" is used to yeild all the sagas at the same time
}
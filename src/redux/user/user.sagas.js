import { put, call, all, takeLatest } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { auth , createUserProfileDocument , googleProvider } from "../../firebase/firebase.utils";
import { googleSigninFailure, googleSigninSuccess } from "./user.actions";


export function* signInWithGoogle (){
    try
    {
        const {user}  = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument , user);
        const userSnapShot = yield userRef.get();
        yield put(googleSigninSuccess({id:userSnapShot.id ,...userSnapShot.data() }))
    }
    catch(error){
        googleSigninFailure(error);
    }
}

export function* onGoogleSigninStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGIN_START , signInWithGoogle);
}

export function* userSagas(){
    yield all([call(onGoogleSigninStart)]);
}



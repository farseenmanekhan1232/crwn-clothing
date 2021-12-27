import { put, call, all, takeLatest } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { auth , createUserProfileDocument , googleProvider } from "../../firebase/firebase.utils";
import { signinSuccess , signinFailure} from "./user.actions";


export function* signInWithGoogle (){
    try
    {
        const {user}  = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument , user);
        const userSnapShot = yield userRef.get();
        yield put(signinSuccess({id:userSnapShot.id ,...userSnapShot.data() }))
    }
    catch(error){
        yield put(signinFailure(error));
    }
}

export function* GoogleSigninStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START , signInWithGoogle);
}

export function* signInWithEmail({payload:{email , password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument , user);
        const userSnapShot = yield userRef.get();
        yield put(signinSuccess({id:userSnapShot.id ,...userSnapShot.data() }))
        } 
    catch (error) {
        yield put(signinFailure(error));
        }
}

export function* EmailSigninStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGIN_START ,signInWithEmail );
}

export function* userSagas(){
    yield all([call(EmailSigninStart) , call(GoogleSigninStart)]);
}



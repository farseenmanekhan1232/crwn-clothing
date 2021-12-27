import UserActionTypes from './user.types';

export const googleSigninStart= ()=>(
  {
    type:UserActionTypes.GOOGLE_SIGNIN_START
  }
);

export const emailSigninStart= (email , password)=>(
  {
    type:UserActionTypes.EMAIL_SIGNIN_START , 
    payload : {email , password}
  }
);

export const signinSuccess = user=>({
  type:UserActionTypes.SIGNIN_SUCCESS , 
  payload : user
});

export const signinFailure = error=>({
  type:UserActionTypes.SIGNIN_FAILURE , 
  payload : error
});


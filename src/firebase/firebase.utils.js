import app from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {  
  apiKey: "AIzaSyAVD1HLjvAay7ohihjNgDIt-hqNCV7RFtk",
  authDomain: "crwn-clothing-3061a.firebaseapp.com",
  projectId: "crwn-clothing-3061a",
  storageBucket: "crwn-clothing-3061a.appspot.com",
  messagingSenderId: "1086423670194",
  appId: "1:1086423670194:web:8cacdfe70eb85b9a3218ab",
  measurementId: "G-RWQ23LFE92"
};

app.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef , obj);
  });
  
  return await batch.commit();
}


export const convertCollectionSnapshotToMap=(collections)=>{
  
  const transformedCollection=collections.docs.map(doc=>{
    const {title , items}=doc.data();
    return {
      routeName:encodeURI(title.toLowerCase()),
      id:doc.id,
      title , 
      items
    }

  });
  return transformedCollection.reduce( (accumulator , collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {});
}

export const auth = app.auth();
export const firestore = app.firestore();

export const googleProvider = new app.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default app;

import app from "./FirebaseService";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";

import UserService from "./UserService";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  
} from "firebase/auth";

;

export const ERROR_ALREADY_IN_USE_CODE = "auth/email-already-in-use";
export const ERROR_INVALID_CREDENTIAL = "auth/invalid-credential";


export const auth = getAuth(app);

let googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const resetPassword = async (email) => {
 return await sendPasswordResetEmail(auth, email).then(() => {return {"status":true, "error":null}}).catch((error) => {return {"status":false, "error":error}});
};


export const sendVerificationEmail = async (email) => {  
    return await sendEmailVerification(auth.currentUser).then(() => {return true}).catch((error) => {return false});

}

export const getUser = () => {
    return auth.currentUser;
}

export const isAuth = async () => {
    const currentUser = auth.currentUser;
      if (currentUser) {
        try {
            
          const idTokenResult = await getIdTokenResult(currentUser);
          return true;
        } catch (error) {
            console.error('Kimlik doğrulama belirteci hatası:', error);
            return false;
        }
      } else {
        return false;
      }
}

export const signout = async () => {
    
    let temp_user = auth.currentUser;
    let res = await signOut(auth).then(() => {
        localStorage.removeItem("UserProfile");
        return temp_user;
    }).catch((error) => {
        console.log(error)
        return null;
    });
    auth.currentUser?.delete();
    return res;
    
}


export const signUpWithGoogle = async () => {
    return await signUpWithProvider(googleProvider, GoogleAuthProvider);
};

export const signUpWithEmailAndPassword = async (name, email, password, isAgree) => {
    let res = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            user.displayName = name;
            
            let api_res = await UserService.addUser(user.uid);
            if(!api_res.isSuccess){
                user.delete();
                return { "user": null, "status": false, "error": api_res.message};
            }

            return { "user": user, "status": true, "error": null};
        })
        .catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return { "user": null, "status": false, "error": error};
        });

    return res;
};


const signUpWithProvider = async (provider, providerCls) => {
    await signout(auth);
    let login_res = await loginWithProvider(provider,providerCls);
    
    if(!login_res.status){
        return login_res;
    }

    let api_res = await UserService.addUser(auth.currentUser.uid);     
    if(!api_res.isSuccess){
        auth.currentUser.delete();
        return { "user": null, "status": false, "error": api_res.message};
    }

    return login_res;
}



export const loginGoogle = async () => {
    return await loginWithProvider(googleProvider, GoogleAuthProvider);
};


export const loginWithEmailAndPassword = async (email, password) => {
    let res = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        
        const user = userCredential.user;
        console.log("LOGİn EMAİL AND PASSWORD ", user)
        return {"user" :user, "status": true, "error": null};
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return {"user" :null, "status": false, "error": error};
        });
    
    return res;
}

const loginWithProvider = async (provider,providerCls) => {
    let res =  await signInWithPopup(auth, provider)
        .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = providerCls.credentialFromResult(result) //GoogleAuthProvider.credentialFromResult();
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        user["accessToken"] = token;

        // IdP data available using getAdditionalUserInfo(result)
        return {"user" :user, "status": true, "error": null};
        // ...
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = providerCls.credentialFromError(error);
        console.log(errorCode, errorMessage, credential)
        return {"user" :null, "status": false, "error": error};
        // ...
        });

    return res;
}

export default {auth,signout, signUpWithGoogle, signUpWithEmailAndPassword, loginGoogle, loginWithEmailAndPassword, getUser, isAuth, resetPassword, sendVerificationEmail, ERROR_ALREADY_IN_USE_CODE, ERROR_INVALID_CREDENTIAL};


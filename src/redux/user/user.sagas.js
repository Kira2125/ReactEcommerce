import {takeLatest, put, all, call} from 'redux-saga/effects';
import {UserActionTypes} from "./user.types";
import {createUserProfileDocument, googleProvider, auth, getCurrentUser} from "../../firebase/firebase.utils";
import {signInFailure, signOutFailure, signOutSuccess, signSuccess, signUpFailure, signUpSuccess} from "./user.actions";


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield  userRef.get();
        yield put(signSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (e) {
        yield put(signInFailure(e))
    }
}

export function* signInWithGoogle() {
   try {
       const {user} = yield auth.signInWithPopup(googleProvider);
       yield getSnapshotFromUserAuth(user)
   } catch (e) {
       yield put(signInFailure(e))
   }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (e) {
        yield put(signInFailure(e))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuth() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (e) {
        yield put(signInFailure(e))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuth)
}

export function* isSignOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutFailure(e))
    }
}

export function* signOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, isSignOut);
}

export function* signUp({payload: {email, password, displayName} }) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch (e) {
        yield put(signUpFailure(e))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),
                      call(onEmailSignInStart),
                      call(onCheckUserSession),
                      call(signOutStart),
                      call(onSignUpStart),
                      call(onSignUpSuccess)])
}
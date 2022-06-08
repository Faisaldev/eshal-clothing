import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocfromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../services/firebase.service';
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocfromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInAuthUserWithEmailAndPassword(email, password);
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpWithEmail({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield createAuthUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed());
  }
}

export function* onCheckUserSessionStart() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInstart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* userSaga() {
  yield all([
    call(onCheckUserSessionStart),
    call(onGoogleSignInStart),
    call(onEmailSignInstart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

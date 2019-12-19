import {takeLatest, put, all, call} from 'redux-saga/effects';
import {clearCart} from "./cart.actions";
import {UserActionTypes} from "../user/user.types";


export function* clearProcess() {

    yield put(clearCart());
}

export function* clearCartStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearProcess)
}

export function* cartSagas() {
    yield all([call(clearCartStart)])
}
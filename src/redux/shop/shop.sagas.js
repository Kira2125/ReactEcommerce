import {takeEvery} from 'redux-saga/effects';
import shopTypes from "./shop.types";


export function* fetchCollectionsAsync() {
    yield console.log('BumBum');
}

export function* fetchCollectionsStartGen() {
    yield takeEvery(shopTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
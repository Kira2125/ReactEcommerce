import {takeEvery, call, put} from 'redux-saga/effects';
import shopTypes from "./shop.types";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionError, fetchCollectionsSuccess} from "./shop.actions";


export function* fetchCollectionsAsync() {

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap)) //dispatch in redux sagas
    }
    catch (e) {
        yield (fetchCollectionError(e.message));
    }

}

export function* fetchCollectionsStartGen() {
    yield takeEvery(shopTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
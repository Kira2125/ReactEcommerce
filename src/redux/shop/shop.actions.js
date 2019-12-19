import shopTypes from "./shop.types";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: shopTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionMap => ({
    type: shopTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap,
});

export const fetchCollectionError = errorMessage => ({
    type: shopTypes.FETCH_COLLECTIONS_ERROR,
    payload: errorMessage,
});

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
            .catch(error => dispatch(fetchCollectionError(error.message)));

    }
}

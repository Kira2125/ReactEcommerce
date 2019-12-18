import { createSelector } from 'reselect';


const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const shopSelector = state => state.shop;

export const shopSelectorCollections = createSelector(
    [shopSelector],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [shopSelectorCollections],
    collections => collections ? Object.keys(collections).map((key) => collections[key]): []
)



export const selectCollection = collectionUrlParam =>
    createSelector(
        [shopSelectorCollections],
        collections => collections ? collections[collectionUrlParam]: null
    )

export const selectFetching = createSelector(
    [shopSelector],
    shop => shop.isFetching
)

export const selectCollectionIsLoaded = createSelector(
    [shopSelector],
    shop => !!shop.collections
)

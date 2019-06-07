import { AsyncStorage } from 'react-native'

import { setDummyData, DECKS_STORAGE_KEY } from './dummyData'

export function fetchFlashCards() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(setDummyData)
}

export function submitEntry ({ key, entry }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}
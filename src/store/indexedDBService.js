import {openDb} from 'idb'

const dbPromise = _ => {
    if (!('indexedDB' in window)) {
        throw new Error('Browser does not support IndexedDB')
    }
    return openDb('ZASHShoppingDB', 1, upgradeDb => {
        if (!upgradeDb.objectStoreNames.contains('cart')) {
            upgradeDb.createObjectStore('cart')
        }
        if (!upgradeDb.objectStoreNames.contains('auth')) {
            upgradeDb.createObjectStore('auth')
        }
        if (!upgradeDb.objectStoreNames.contains('offers')) {
            upgradeDb.createObjectStore('offers')
        }

    });
}

const checkStorage = async storeName => {
    try {
        const db = await dbPromise()
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)

        return store.get(storeName)
    } catch (error) {
        return error
    }
}

const saveToStorage = async (storeName, tasks) => {
    try {
        const db = await dbPromise()
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)

        store.put(tasks, storeName)

        return tx.complete
    } catch (error) {
        return error
    }
}
const clearAllStorage = async (storeName) => {
    try {
        const db = await dbPromise()
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)

        store.clear()

        return tx.complete
    } catch (error) {
        return error
    }
}

export default {
    checkStorage,
    clearAllStorage,
    saveToStorage
}

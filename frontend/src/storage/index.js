export class AppStorage {

    static storeItem(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    static getItem(key) {
        localStorage.getItem(key);
    }
}
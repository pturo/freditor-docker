export class Storage {

    public getStorage(name: string) {
        return localStorage.getItem(name);
    }

    public setStorage(name: string, value: any) {
        localStorage.setItem(name, JSON.stringify(value));
    };

    public removeAndClearStorage(name: string) {
        localStorage.removeItem(name);
        localStorage.clear();
    }
}
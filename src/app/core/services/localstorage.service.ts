import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Globalfunction } from '../global/globalfunction';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}
    public globalfunction: Globalfunction = new Globalfunction();
    public localstorageprefix = environment.localstorage_prefix;
    public encryptSecretKey = environment.SecretKey;
    public path_prefix = ''; //window.location.pathname.replace("/", "");
    public prefix = this.path_prefix != '' ? this.localstorageprefix + this.path_prefix + '_' : this.localstorageprefix;

    getItem(key: string): string {
        var returnval = null;
        if (localStorage.getItem(this.prefix + key) != null)
            returnval = this.globalfunction.decryptData(localStorage.getItem(this.prefix + key));
        return returnval;
    }

    setItemObj(key: string, item: any) {
        localStorage.setItem(this.prefix + key, this.globalfunction.encryptData(JSON.stringify(item)));
    }

    setItemString(key: string, item: string) {
        localStorage.setItem(this.prefix + key, this.globalfunction.encryptData(item));
    }

    removeItem(key: string) {
        localStorage.removeItem(this.prefix + key);
    }

    clearAll() {
        //localStorage.clear();

        var arr = []; // Array to hold the keys
        // Removing element while iterating is unsafe, Iterate over localStorage and insert the keys that meet the condition into arr
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith(this.prefix)) {
                arr.push(localStorage.key(i));
            }
        }

        // Iterate over arr and remove the items by key
        for (var i = 0; i < arr.length; i++) {
            localStorage.removeItem(arr[i]);
        }
    }

    Key(index: number) {
        return localStorage.key(index);
    }
}

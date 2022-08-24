import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getStorage(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  public setStorage(name: string, value: any): void {
    sessionStorage.setItem(name, JSON.stringify(value));
  };

  public removeStorage(name: string) {
    sessionStorage.removeItem(name);
  }

  public clearStorage() {
    sessionStorage.clear();
  }
}

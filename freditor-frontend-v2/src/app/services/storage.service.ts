import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getStorage(name: string): string | null {
    return localStorage.getItem(name);
  }

  public setStorage(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  };

  public removeStorage(name: string) {
    localStorage.removeItem(name);
  }

  public clearStorage() {
    localStorage.clear();
  }
}

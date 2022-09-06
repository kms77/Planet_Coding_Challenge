import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';
import { GlobalConstants } from 'src/app/utils/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key: string = GlobalConstants.KEY;

  constructor() { }

  public saveData(key: string, value: string): void{
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string){
    let data: string = localStorage.getItem(key) || " ";
    return this.decrypt(data);
  }

  public removeData(key: string): void{
    localStorage.removeItem(key);
  }

  public clearData(): void{
    localStorage.clear();
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

  private decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

}

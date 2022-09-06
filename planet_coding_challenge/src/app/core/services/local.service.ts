import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';
import { GlobalConstants } from 'src/app/utils/global-constants';

@Injectable({
  providedIn: 'root'
})

// service which manages the local stoarage data
export class LocalService {

  key: string = GlobalConstants.KEY;

  constructor() { }

  // save an encrypted value in the local storage
  public saveData(key: string, value: string): void{
    localStorage.setItem(key, this.encrypt(value));
  }

  // get the value from the local storage by key
  public getData(key: string){
    let data: string = localStorage.getItem(key) || " ";
    return this.decrypt(data);
  }

  // remove data from the local storage by key
  public removeData(key: string): void{
    localStorage.removeItem(key);
  }

  // delete all keys from the local service
  public clearData(): void{
    localStorage.clear();
  }

  /**
   * Method to encrypt the saved value in the local storage
   *
   * @param text - the value to be encrypted
   * @remarks
   * Because of the key passphrase, the method will generate a 256-bit key
   *
   * @returns
   * A 256-bit key that represents the encrypted value which was saved in the local storage
   */
  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

 /**
   * Method to decrypt the saved value in the local storage
   *
   * @param textToDecrypt - the 256-bit key that was generated at the encryption process
   * @remarks
   *
   * @returns
   * Returns the value represented by thhe 256-but key
   */
  private decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

}
